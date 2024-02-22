import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IResponseRegisterApi, RegistrationData, RegistrationResponse } from '../types'

const BASE_URL = 'https://9art.ru/api/v1/auth'
// Создаем функцию для извлечения токена из localStorage
const getToken = () => {
  return localStorage.getItem('accessTokenSnapix')
}

export const Register_Login_Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // Добавляем заголовок Authorization к каждому запросу
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
  // ! login не используется, оставил для наглядности
  endpoints: builder => ({
    login: builder.mutation<any, any>({
      query: body => ({
        body,
        method: 'POST',
        url: '/login',
      }),
      transformResponse: (response: IResponseRegisterApi) => {
        localStorage.setItem('accessTokenSnapix', response.accessToken || '')

        localStorage.setItem('isAuthSnapix', 'true')

        return response
      },
    }),

    logout: builder.mutation<void, void>({
      onQueryStarted: async () => {
        // Удаляем токен из localStorage
        localStorage.removeItem('accessTokenSnapix')
        // Устанавливаем isAuthSnapix в значение false
        localStorage.setItem('isAuthSnapix', 'false')
      },
      query: () => ({
        method: 'POST',
        url: '/logout',
      }),
    }),
    refresh: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: '/refresh-token',
      }),
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

export const { useLoginMutation, useLogoutMutation, useRefreshMutation, useRegisterMutation } =
  Register_Login_Api
