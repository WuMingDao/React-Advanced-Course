import type { Article } from '@/types/Article';
import { HeartIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

function ArticleListItem({ article }: { article: Article }) {
  function getArticleBrief(content: string, maxLength = 100) {
    const blocks = JSON.parse(content);

    let brief = '';

    brief = blocks
      .map((block: any) => {
        let ownText = '';
        let childrenText = '';

        if (Array.isArray(block.content)) {
          ownText = block.content
            .map((item: any) => {
              if (item.type === 'text') {
                return item.text;
              }

              if (item.type === 'link') {
                if (Array.isArray(item.content)) {
                  item.content.map((child: any) => child.text ?? '').join(' ');
                }
              }

              return '';
            })
            .join(' ');
        }

        if (Array.isArray(block.children)) {
          childrenText = block.children
            .map((childBlock: any) => {
              getArticleBrief(JSON.stringify([childBlock]), maxLength);
            })
            .join(' ');
        }

        return `${ownText} ${childrenText}`.trim();
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!brief) {
      brief = 'No brief';
    }

    return brief.length > maxLength
      ? brief.slice(0, maxLength).trim() + '...'
      : brief;
  }

  return (
    <Link to="/articles/$articleId" params={{ articleId: `${article.id}` }}>
      <li className="list-row h-40">
        <div>
          <img
            className="rounded-box size-30"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
        </div>
        <div>
          {/* Title */}
          <div className="font-serif text-2xl font-bold sm:text-5xl">
            {article.title}
          </div>

          {/* Content brief */}
          <div className="text-sm font-semibold opacity-60 sm:text-2xl">
            {getArticleBrief(article.content)}
          </div>
        </div>

        <button className="btn btn-secondary btn-square btn-ghost">
          <div className="sm:tooltip" data-tip="like">
            <HeartIcon size={24} />
          </div>
        </button>
      </li>
    </Link>
  );
}

export default ArticleListItem;
