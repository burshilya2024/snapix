import { getToken } from '@/6_shared/api/GetAccessToken'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://9art.ru/api/v1/users'

export interface ProfileUser {
  aboutMe?: null | string
  birthDate?: Date | null
  city?: null | string
  firstName?: null | string
  lastName?: null | string
  lastUpdate: string // Формат даты и времени в строке
  userName: string
}

export interface FormData {
  aboutMe?: null | string
  birthDate?: null | string
  city?: null | string
  firstName?: null | string
  lastName?: null | string
  lastUpdate: string // Формат даты и времени в строке
  userName: string
}

export const MyProfile_Api = createApi({
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
    getUserProfile: builder.query<ProfileUser, void>({
      query: () => ({
        method: 'GET',
        url: `/profile`,
      }),
    }),
    profileData: builder.mutation<any, any>({
      query: body => ({
        body,
        method: 'PUT',
        url: '/profile',
      }),
    }),
  }),
  reducerPath: 'MyProfile_Api',
})

export const { useGetUserProfileQuery, useProfileDataMutation } = MyProfile_Api
