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

export const userApiAvatar = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://9art.ru/api/v1/users/profile/avatar' }),
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
