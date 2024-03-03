import { LoginNavigate } from '@/4_features/Authorization/Register_Login_User/hoc/LoginNavigate'
import { MyPayments } from '@/4_features/MyProfile/components/MyPayments';

export const MyPaymentsPage = () => {
  return (
    <LoginNavigate>
      <MyPayments />
    </LoginNavigate>
  );
}
