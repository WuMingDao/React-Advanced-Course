import { useDeleteArticle } from '@/features/article/article';
import { Route as ArticleRoute } from '@/routes/_app/articles.$articleId';
import { getArticleById } from '@/services/apiArticle';
import AppEditor from '@/ui/AppEditor';
import Avatar from '@/ui/Avatar';
import CurrentUser from '@/ui/CurrentUser';
import Loading from '@/ui/Loading';
import { useCreateBlockNote } from '@blocknote/react';
import { SignedIn } from '@neondatabase/neon-js/auth/react';
import {
  BookmarkIcon,
  PencilCircleIcon,
  ThumbsUpIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';

function ArticleDisplay() {
  const { articleId } = ArticleRoute.useParams();
  const navigate = useNavigate();

  const editor = useCreateBlockNote();

  const {
    data: articleDisplay,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['article', articleId],
    queryFn: async () => {
      const articleDisplay = await getArticleById(Number(articleId));

      editor.replaceBlocks(editor.document, JSON.parse(articleDisplay.content));

      return articleDisplay;
    },
  });

  const { deleteArticleById, isDeleting } = useDeleteArticle();

  const articleUpdatedTime = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (isError) {
    return (
      <main className="content-layout-h flex items-center justify-center">
        <div className="text-error">
          {error.message || 'Failed to load articles'}
        </div>
      </main>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!articleDisplay) {
    return (
      <main className="content-layout-h flex items-center justify-center">
        <div>Articles not found</div>
      </main>
    );
  }

  return (
    <>
      <h1 className="mb-8 text-center font-serif text-7xl">
        {articleDisplay?.title}
      </h1>

      <div className="flex items-center justify-center gap-4">
        <Avatar
          avatarURL={articleDisplay.author.image ?? ''}
          username={articleDisplay.author.name}
        />

        <div>
          <div className="text-4xl">{articleDisplay.author.name}</div>
          <div className="opacity-50">
            {articleUpdatedTime.format(new Date(articleDisplay.updated_at))}
          </div>
        </div>
      </div>

      <SignedIn>
        <div className="divider"></div>

        <div className="flex justify-center">
          <ul className="menu menu-horizontal rounded-box">
            <li>
              <a className="tooltip mx-1" data-tip="Like">
                <ThumbsUpIcon size={24} weight="thin" />
              </a>
            </li>
            <li>
              <a className="tooltip mx-1" data-tip="Bookmark">
                <BookmarkIcon size={24} weight="thin" />
              </a>
            </li>

            <CurrentUser articleDisplay={articleDisplay}>
              {/* Edit */}
              <li>
                <Link
                  to="/articles/edit/$articleId"
                  params={{ articleId }}
                  className="tooltip mx-1 bg-blue-600"
                  data-tip="Edit"
                >
                  <PencilCircleIcon size={24} weight="thin" />
                </Link>
              </li>

              {/* Delete */}
              <li>
                <button
                  onClick={() =>
                    deleteArticleById(
                      { articleId: Number(articleId) },
                      {
                        onSuccess: () => {
                          navigate({ to: '/' });
                        },
                      },
                    )
                  }
                  className="tooltip mx-1 bg-red-600"
                  data-tip="Delete"
                  disabled={isDeleting}
                >
                  <TrashIcon size={24} weight="thin" />
                </button>
              </li>
            </CurrentUser>
          </ul>
        </div>
        <div className="divider"></div>
      </SignedIn>

      <AppEditor editor={editor} editable={false} />
    </>
  );
}

export default ArticleDisplay;
