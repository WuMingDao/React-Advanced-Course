import { userAtom } from '@/atoms/user';
import type { Article } from '@/types/Article';
import { useAtomValue } from 'jotai';

function CurrentUser({
  article,
  children,
}: {
  article: Article | undefined;
  children: React.ReactNode;
}) {
  const user = useAtomValue(userAtom);

  if (!user || user.id !== article?.author_id) {
    return null;
  }

  return children;
}

export default CurrentUser;
