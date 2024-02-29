import { useEffect, useState } from 'react'

import { LoginNavigate } from '@/4_features/Authorization/Register_Login_User/hoc/LoginNavigate'
import { JwtPayload, jwtDecode } from 'jwt-decode'

interface User {
  email: string
  id: number
  name: string
}

export function MyProfile() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const accessTokenString = localStorage.getItem('accessTokenSnapix') || ''

    if (!accessTokenString) {
      // Обработка случая, когда токен не найден в локальном хранилище
      console.error('No access token found!')

      return
    }

    try {
      const accessToken = accessTokenString as string
      const decodedToken = jwtDecode<JwtPayload>(accessToken)
      //@ts-ignore
      const decodedUser: User = decodedToken.user

      setUser(decodedUser)
    } catch (error) {
      console.error('Invalid token:', error)
    }
  }, [])

  if (!user) {
    return <div>No access token found or token is invalid!</div>
  }

  console.log('user from myprofile', user)

  return (
    <LoginNavigate>
      <div>
        <h1>{user.email}</h1>
        <h1>{user.name}</h1>
      </div>
    </LoginNavigate>
  )
}
