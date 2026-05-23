import type { ArticleDisplay } from '@/types/Article';
import Avatar from '@/ui/Avatar';
import { HeartIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

function ArticleListItem({
  articleDisplay,
}: {
  articleDisplay: ArticleDisplay;
}) {
  function getArticleBrief(content: string, maxLength = 50) {
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

  const articleUpdatedTime = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link
      to="/articles/$articleId"
      params={{ articleId: `${articleDisplay.id}` }}
    >
      <div className="m-4 flex items-center gap-4">
        <Avatar
          avatarURL={articleDisplay.author.image ?? ''}
          username={articleDisplay.author.name}
          size="sm"
          className="w-10"
        />

        <div>
          <div className="text-2xl sm:text-4xl">
            {articleDisplay.author.name}
          </div>
          <div className="opacity-50">
            {articleUpdatedTime.format(new Date(articleDisplay.updated_at))}
          </div>
        </div>
      </div>

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
            {articleDisplay.title}
          </div>

          {/* Content brief */}
          <div className="text-sm font-semibold opacity-60 sm:text-2xl">
            {getArticleBrief(articleDisplay.content)}
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
