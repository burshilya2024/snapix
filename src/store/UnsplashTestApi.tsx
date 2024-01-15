// api.ts
import { Photo } from '@/common/types/photo'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = '-R1NIoPats74w7LQjkm6-zdv3ilBtzlCsL8fJOViYpo'

export const UnsplashTextApi = createApi({
  reducerPath: 'UnsplashTextApi',
  // eslint-disable-next-line perfectionist/sort-objects
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.unsplash.com' }), // Укажите базовый URL для вашего API
  endpoints: builder => ({
    fetchDataPhoto: builder.query<Photo[], void>({
      query: () => `/photos?client_id=${API_KEY}&per_page=16&page=1`, // Ваш запрос к API
    }),
  }),
})

export const { useFetchDataPhotoQuery } = UnsplashTextApi
