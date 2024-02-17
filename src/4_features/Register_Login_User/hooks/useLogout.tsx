import { useLogoutMutation } from '@/4_features/Register_Login_User/api/register_Login_Api'
import { useToast } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'

export const useLogout = () => {
  const [logout] = useLogoutMutation()
  const toast = useToast()
  const logOut = async () => {
    await logout('')
      .unwrap()
      .then((res: any) => {
        signOut({ callbackUrl: '/' })
      })
      .catch((error: any) => {
        const errorMessage = error?.message || 'An error occurred during logout.'

        toast({
          description: errorMessage,
          duration: 5000,
          isClosable: true,
          status: 'error',
          title: 'Oops!',
        })
      })
    // signOut({ callbackUrl: '/' })
  }

  return logOut
}
