import AccountSecurity from '@/features/account/AccountSecurity';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_protected/account/security')({
  component: AccountSecurity,
});
