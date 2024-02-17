//!PUBLICK API или entry point(тут експорты которые указывает что мы можем использовать снаружи)
// в features находиться бизнес логика, думаю это основная папка, где будет самое большое количество компоненты

export { LoginComponents } from './Register_Login_User/Components/LoginUser'
export { SignUpComponent } from './Register_Login_User/Components/RegisterUser'
export { ForgotPasswordComponent } from './PasswordRecovery/Components/ForgotPassword'
export { ResetPasswordComponent } from './PasswordRecovery/Components/ResetPassword'
export { ResendEmailComponent } from './PasswordRecovery/Components/ResendEmail'
