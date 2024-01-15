// store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit'

import { UnsplashTextApi } from './UnsplashTextApi'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(UnsplashTextApi.middleware),
  reducer: {
    [UnsplashTextApi.reducerPath]: UnsplashTextApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
