// store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PlaceHolderApi = createApi({
  reducerPath: 'PlaceHolderApi',
  // eslint-disable-next-line perfectionist/sort-objects
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: builder => ({
    fetchPosts: builder.query<any[], void>({
      query: () => 'posts',
    }),
  }),
})

export const { useFetchPostsQuery } = PlaceHolderApi
