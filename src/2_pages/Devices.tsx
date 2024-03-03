import { LoginNavigate } from '@/4_features/Authorization/Register_Login_User/hoc/LoginNavigate'
import { Devices } from '@/4_features/MyProfile/components/Devices';

export const DevicesPage = () => {
  return (
    <LoginNavigate>
      <Devices />
    </LoginNavigate>
  );
}