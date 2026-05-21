import { useUserProfile } from '../hooks/userProfile';
import Loading from './Loading';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

function RequireVerifiedEmail({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && !user.emailVerified) {
      navigate({ to: '/auth/verify-email' });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loading />;
  }

  return children;
}

export default RequireVerifiedEmail;
