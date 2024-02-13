import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IResponseRegisterApi, RegistrationData, RegistrationResponse } from '../types'

const BASE_URL = 'https://9art.ru/api/v1/auth'

export const Registery_Login_Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  // !не используется, оставил для наглядности
  endpoints: builder => ({
    login: builder.mutation<string, { email: string; password: string }>({
      query: credentials => ({
        body: credentials,
        method: 'POST',
        url: '/login',
      }),
      transformResponse: (response: any) => {
        localStorage.setItem('access_token', response.accesstoken || '')
        localStorage.setItem('isAuth', 'true')

        return response
      },
    }),
    refresh: builder.mutation<any, any>({
      query: ({ refresh_token }: any) => ({
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
        method: 'POST',
        url: '/refresh-token',
      }),
      // transformResponse: (response: IResponseRegisterApi) => {
      //   localStorage.setItem('access_token', response.access_token || '')
      //   localStorage.setItem('refresh_token', response.refresh_token || '')
      //   localStorage.setItem('isAuth', 'true')

      //   return response
      // },
    }),
    register: builder.mutation<Promise<string>, RegistrationData>({
      query: body => ({
        body,
        method: 'POST',
        url: `/register`,
      }),
    }),
  }),
  reducerPath: 'Registery_Login_Api',
})

export const { useLoginMutation, useRefreshMutation, useRegisterMutation } = Registery_Login_Api
