import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://9art.ru/api/v1/auth'

export const PasswordRecovery_Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: builder => ({
    passwordRecovery: builder.mutation<any, any>({
      query: body => ({
        body,
        method: 'POST',
        url: '/forgot-password',
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: body => ({
        body,
        method: 'POST',
        url: '/new-password',
      }),
    }),
  }),
  reducerPath: 'PasswordRecovery_Api',
})

export const { usePasswordRecoveryMutation, useResetPasswordMutation } = PasswordRecovery_Api
