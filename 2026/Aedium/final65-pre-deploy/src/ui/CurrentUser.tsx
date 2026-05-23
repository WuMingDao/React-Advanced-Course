import { userAtom } from '@/atoms/user';
import type { ArticleDisplay } from '@/types/Article';
import { useAtomValue } from 'jotai';

function CurrentUser({
  articleDisplay,
  children,
}: {
  articleDisplay: ArticleDisplay;
  children: React.ReactNode;
}) {
  const user = useAtomValue(userAtom);

  if (!user || user.id !== articleDisplay?.author_id) {
    return null;
  }

  return children;
}

export default CurrentUser;
