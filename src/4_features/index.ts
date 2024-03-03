//!PUBLICK API или entry point(тут експорты которые указывает что мы можем использовать снаружи)
// в features находиться бизнес логика, думаю это основная папка, где будет самое большое количество компоненты

export { ForgotPasswordComponent } from './Authorization/PasswordRecovery/Components/ForgotPassword'
export { ResendEmailComponent } from './Authorization/PasswordRecovery/Components/ResendEmail'
export { ResetPasswordComponent } from './Authorization/PasswordRecovery/Components/ResetPassword'
export { LoginComponents } from '@/4_features/Authorization/Register_Login_User/ui/LoginUser'
export { SignUpComponent } from '@/4_features/Authorization/Register_Login_User/ui/RegisterUser'
export { Devices } from '@/4_features/MyProfile/components/Devices'
export { MyPayments } from '@/4_features/MyProfile/components/MyPayments'
export { AccountManagement } from '@/4_features/MyProfile/components/AccountManagement'

