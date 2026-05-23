import AccountSetting from '@/features/account/AccountSetting';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_protected/account/settings')({
  component: AccountSetting,
});
