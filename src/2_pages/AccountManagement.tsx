import { LoginNavigate } from '@/4_features/Authorization/Register_Login_User/hoc/LoginNavigate'
import { AccountManagement } from '@/4_features/MyProfile/components/AccountManagement';

export const AccountManagementPage = () => {
  return (
    <LoginNavigate>
      <AccountManagement />
    </LoginNavigate>
  );
}
