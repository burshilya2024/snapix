import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { JwtPayload, jwtDecode } from 'jwt-decode'

export interface Avatar {
  height: number
  size: number
  url: string
  width: number
}

export interface GetAvatarsResponse {
  avatars: Avatar[]
}

export interface ProfileUser {
  aboutMe?: null | string
  birthDate?: Date | null
  city?: null | string
  firstName?: null | string
  lastName?: null | string
  lastUpdate: string // Формат даты и времени в строке
  userName: string
}

export const getToken = () => {
  return localStorage.getItem('accessTokenSnapix')
}

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

export const BASE_URL = 'https://9art.ru/api/v1/users'

export const userApiAvatar = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: headers => {
      // Получаем токен из localStorage
      const token = getToken() || ''

      // Если токен доступен, добавляем его в заголовок Authorization
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: builder => ({
    deleteAvatar: builder.mutation<any, void>({
      query: () => ({
        method: 'DELETE',
        url: '/profile/avatar',
      }),
    }),
    getAvatar: builder.query<any, any>({
      query: userId => ({
        method: 'GET',
        url: `/${userId}/profile/avatar`, // Обновленный URL запроса с id пользователя
      }),
    }),
    //! Что бы не создавать новый RTK конкретно на данные профиля юзера, я сделал тут!
    getUser: builder.query<ProfileUser, void>({
      query: () => ({
        method: 'GET',
        url: `/profile`,
      }),
    }),
    uploadAvatar: builder.mutation<any, FormData>({
      query: formData => ({
        body: formData,
        method: 'POST',
        url: '/profile/avatar',
      }),
    }),
  }),

  reducerPath: 'userApi',
})

export const {
  useDeleteAvatarMutation,
  useGetAvatarQuery,
  useGetUserQuery,
  useUploadAvatarMutation,
} = userApiAvatar
