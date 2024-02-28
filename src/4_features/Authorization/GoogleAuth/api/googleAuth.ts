import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IResponseRegisterApi } from '@/4_features/Authorization/Register_Login_User/types'

const BASE_URL = 'https://9art.ru/api/v1/oauth'
const getToken = () => {
  return localStorage.getItem('accessTokenSnapix')
}
export const googleAuth = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    // prepareHeaders: headers => {
    //   // Получаем токен из localStorage
    //   const token = getToken() || ''
    //
    //   // Если токен доступен, добавляем его в заголовок Authorization
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }
    //
    //   return headers
    // },
  }),
  endpoints: builder => ({
    getGoogleLogin: builder.query<any, any>({
      query: () => ({
        method: 'GET',
        url: '/google',
      }),
    }),
    googleLoginSuccess: builder.mutation<any, any>({
      query: token => ({
        method: 'POST',
        url: '/exchange-token',
        body: { token: token },
      }),
      transformResponse: (response: IResponseRegisterApi) => {
        localStorage.setItem('accessTokenSnapix', response.accessToken || '')
        localStorage.setItem('isAuthSnapix', 'true')
        return response
      },
    }),
  }),
  reducerPath: 'googleAuth',
})

export const { useGetGoogleLoginQuery, useGoogleLoginSuccessMutation } = googleAuth
