import ArticleDisplay from '@/features/article/ArticleDisplay';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/articles/$articleId')({
  component: ArticleDisplay,
});
