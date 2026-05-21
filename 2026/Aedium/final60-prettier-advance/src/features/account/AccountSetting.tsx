import AccountSettingForm from './AccountSettingForm';
import { useUserProfile } from '@/hooks/userProfile';

function AccountSetting() {
  const { user, isLoading } = useUserProfile();

  return (
    <main className="content-layout-h flex items-center justify-center">
      {!user || isLoading ? (
        <div className="skeleton h-32 w-xs"></div>
      ) : (
        <AccountSettingForm user={user} />
      )}
    </main>
  );
}

export default AccountSetting;
