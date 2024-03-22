import { LoginNavigate } from '@/4_features/Authorization/Register_Login_User/hoc/LoginNavigate'
import { MyProfilePage } from '@/4_features/MyProfile/components/MyProfile/MyProfilePage'
import {
  getUserIdFromToken,
  useGetAvatarQuery,
  useGetUserQuery,
} from '@/4_features/MyProfile/components/UserAvatar/api/Avatar_Api'

export function MyProfile() {
  return (
    <LoginNavigate>
      <MyProfilePage />
    </LoginNavigate>
  )
}
