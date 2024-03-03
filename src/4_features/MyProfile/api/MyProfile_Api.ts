import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://9art.ru/api/v1/auth'

export const MyProfile_Api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    profileData: builder.mutation({
      query: body => ({
        body,
        method: 'POST',
        url: '/',
      }),
    }),
  }),
  reducerPath: 'MyProfile_Api',
})

export const { useProfileDataMutation } = MyProfile_Api
