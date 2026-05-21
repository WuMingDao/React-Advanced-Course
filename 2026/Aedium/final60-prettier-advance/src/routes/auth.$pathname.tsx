import Auth from '@/features/auth/Auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/$pathname')({
  component: Auth,
});
