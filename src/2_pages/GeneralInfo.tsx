import { LoginNavigate } from '@/4_features/Authorization/Register_Login_User/hoc/LoginNavigate'
import GeneralInformation from '@/4_features/MyProfile/components/MyProfileTabs/GeneralInformation/GeneralInformation'

export const GeneralInfo = () => {
  return (
    <LoginNavigate>
      <GeneralInformation />
    </LoginNavigate>
  )
}
