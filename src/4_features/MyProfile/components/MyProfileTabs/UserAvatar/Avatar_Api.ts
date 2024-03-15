import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Avatar {
  height: number
  size: number
  url: string
  width: number
}

export interface GetAvatarsResponse {
  avatars: Avatar[]
}
const getToken = () => {
  return localStorage.getItem('accessTokenSnapix')
}
const BASE_URL = 'https://9art.ru/api/v1/users/profile/avatar'

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
        url: '',
      }),
    }),
    getAvatar: builder.query<Avatar[], void>({
      query: () => '',
    }),
    updateAvatar: builder.mutation<any, FormData>({
      query: formData => ({
        body: formData,
        method: 'PUT',
        url: '',
      }),
    }),
    uploadAvatar: builder.mutation<any, FormData>({
      query: formData => ({
        body: formData,
        method: 'POST',
        url: '',
      }),
    }),
  }),
  reducerPath: 'userApi',
})

export const {
  useDeleteAvatarMutation,
  useGetAvatarQuery,
  useUpdateAvatarMutation,
  useUploadAvatarMutation,
} = userApiAvatar
