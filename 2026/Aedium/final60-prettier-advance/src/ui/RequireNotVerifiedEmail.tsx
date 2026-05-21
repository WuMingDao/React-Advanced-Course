import { useUserProfile } from '../hooks/userProfile';
import Loading from './Loading';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

function RequireNotVerifiedEmail({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && user.emailVerified) {
      navigate({ to: '/' });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loading />;
  }

  return children;
}

export default RequireNotVerifiedEmail;
