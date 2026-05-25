import ArticleListItem from './ArticleListItem';
import { getAllArticles } from '@/services/apiArticle';
import Loading from '@/ui/Loading';
import { useQuery } from '@tanstack/react-query';

function ArticleList() {
  const {
    data: articleDisplays,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['article-list'],
    queryFn: getAllArticles,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main className="content-layout-h flex items-center justify-center">
        <div className="text-error">
          {error.message || 'Failed to load articles'}
        </div>
      </main>
    );
  }

  if (!articleDisplays || articleDisplays.length === 0) {
    return (
      <main className="content-layout-h flex items-center justify-center">
        <div>No articles found</div>
      </main>
    );
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {articleDisplays.map((articleDisplay) => (
        <ArticleListItem
          key={articleDisplay.id}
          articleDisplay={articleDisplay}
        />
      ))}
    </ul>
  );
}

export default ArticleList;
