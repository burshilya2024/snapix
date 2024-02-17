import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IResponseRegisterApi, RegistrationData, RegistrationResponse } from '../types'

const BASE_URL = 'https://9art.ru/api/v1/auth'

export const Register_Login_Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  // ! login не используется, оставил для наглядности
  endpoints: builder => ({
    login: builder.mutation<any, any>({
      query: body => ({
        body,
        method: 'POST',
        url: '/login',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        method: 'POST',
        url: '/logout',
      }),
    }),
    refresh: builder.mutation<any, any>({
      query: ({ access_token, body }) => ({
        body,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        method: 'POST',
        url: '/refresh',
      }),
      // transformResponse: (response: IResponseRegisterApi) => {
      //   localStorage.setItem('access_token', response.access_token || '')
      //   localStorage.setItem('refresh_token', response.refresh_token || '')
      //   localStorage.setItem('isAuth', 'true')

      //   return response
      // },
    }),
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: body => ({
        body,
        method: 'POST',
        url: `/register`,
      }),
    }),
  }),
  reducerPath: 'Register_Login_Api',
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = Register_Login_Api
