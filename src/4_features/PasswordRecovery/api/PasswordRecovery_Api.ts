import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  IForgotPasswordForm,
  IResetPasswordForm,
  IResetPasswordRequest,
  IVerifyTokenRequest,
} from '../types'

const BASE_URL = 'https://9art.ru/api/v1/auth'

export const PasswordRecovery_Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    passwordRecovery: builder.mutation<null, IForgotPasswordForm>({
      query: body => ({
        body,
        method: 'POST',
        url: '/forgot-password',
      }),
    }),
    resetPassword: builder.mutation<null, IResetPasswordRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: '/new-password',
      }),
    }),
    verifyToken: builder.mutation<null, IVerifyTokenRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: '/forgot-password/verify-token',
      }),
    }),
  }),
  reducerPath: 'PasswordRecovery_Api',
})

export const { usePasswordRecoveryMutation, useResetPasswordMutation, useVerifyTokenMutation } =
  PasswordRecovery_Api
