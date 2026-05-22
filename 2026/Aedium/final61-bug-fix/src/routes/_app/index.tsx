import ArticleList from '@/features/home/ArticleList';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: ArticleList,
});
