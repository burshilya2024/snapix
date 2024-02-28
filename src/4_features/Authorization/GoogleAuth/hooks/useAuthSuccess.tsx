import { useRouter } from 'next/router'
import { useGoogleLoginSuccessMutation } from '@/4_features/Authorization/GoogleAuth/api/googleAuth'
import { useEffect } from 'react'
import {
  ErrorMessage,
  SuccessResponse,
} from '@/4_features/Authorization/Register_Login_User/ui/RegisterUser'
import { useToast } from '@chakra-ui/react'

export const useAuthSuccess = () => {
  const router = useRouter()
  const token = router.query.token
  const toast = useToast()
  const [googleLoginSuccessMutation, {}] = useGoogleLoginSuccessMutation()
  useEffect(() => {
    if (!token) {
      return
    }
    googleLoginSuccessMutation(token)
      .unwrap()
      .then((res: SuccessResponse) => {
        toast({
          description: res.message || 'successful authorization',
          duration: 9000,
          isClosable: true,
          status: 'success',
          title: 'Successful!',
        })
        router.push('/MyProfile')
      })
      .catch((error: ErrorMessage) => {
        const errorMessage = error?.data.errors.message
        toast({
          description: errorMessage,
          duration: 9000,
          isClosable: true,
          status: 'error',
          title: 'Ooops!',
        })
      })
  }, [token])
}
