import { JwtPayload, jwtDecode } from 'jwt-decode'

// Функция для получения userId из токена
export const getUserIdFromToken = () => {
  const accessTokenString = localStorage.getItem('accessTokenSnapix') || ''

  if (!accessTokenString) {
    // Обработка случая, когда токен не найден в локальном хранилище
    console.error('No access token found!')

    return null
  }

  try {
    const accessToken = accessTokenString as string
    const decodedToken = jwtDecode<JwtPayload>(accessToken)
    //@ts-ignore
    const decodedUser = decodedToken.user

    return decodedUser.id
  } catch (error) {
    console.error('Invalid token:', error)

    return null
  }
}
