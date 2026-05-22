import { userAtom } from '@/atoms/user';
import { useUserProfile } from '@/hooks/userProfile';
import RootLayout from '@/ui/RootLayout';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
});

function RouteComponent() {
  const setUser = useSetAtom(userAtom);
  const { user } = useUserProfile();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
