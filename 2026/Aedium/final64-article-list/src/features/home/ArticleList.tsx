import ArticleListItem from './ArticleListItem';
import { getAllArticles } from '@/services/apiArticle';
import Loading from '@/ui/Loading';
import { useQuery } from '@tanstack/react-query';

function ArticleList() {
  const { data: articleDisplays, isLoading } = useQuery({
    queryKey: ['article-list'],
    queryFn: getAllArticles,
  });

  if (isLoading || !articleDisplays) {
    return <Loading />;
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
