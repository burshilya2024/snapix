import React, { useEffect } from 'react'

import { useRefreshMutation } from '@/4_features/Authorization/Register_Login_User/api/register_Login_Api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

type PropsType = {
  children: React.ReactNode
}

export const LoginNavigate: React.FC<PropsType> = ({ children }) => {
  const router = useRouter()
  const [Refresh, {}] = useRefreshMutation()
  const isAuth = localStorage.getItem('isAuthSnapix')
  const refreshToken = Cookies.get('refreshToken')

  useEffect(() => {
    if (isAuth === 'false') {
      if (!refreshToken) {
        router.push('/LogIn') // Redirect to the login page
      } else {
        Refresh()
      }
    }
  }, [router])

  return <>{isAuth === 'true' ? children : null}</>
}
