import EmailVerifyForm from '@/features/auth/EmailVerifyForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/verify-email')({
  component: EmailVerifyForm,
});
