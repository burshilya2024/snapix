import { useLogoutMutation } from '@/4_features/Authorization/Register_Login_User/api/register_Login_Api'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation()
  const toast = useToast()

  return async () => {
    await logout()
      .unwrap()
      .then(() => {
        toast({
          description: 'You are logged out',
          duration: 9000,
          isClosable: true,
          status: 'success',
          title: 'Successful!',
        })
      })
      .catch(error => {
        const errorMessage = error?.message

        toast({
          description: 'An error occurred while logging out:' || errorMessage,
          duration: 9000,
          isClosable: true,
          status: 'error',
          title: 'Ooops!',
        })
      })
  }
}
