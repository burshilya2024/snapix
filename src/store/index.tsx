// store.ts
import { useDispatch } from 'react-redux'

import { Registery_Login_Api } from '@/features/auth/api/userApi'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { PlaceHolderApi } from './PlaceholderTestApi'
import { UnsplashTextApi } from './UnsplashTestApi'

const rootReducer = combineReducers({
  [PlaceHolderApi.reducerPath]: PlaceHolderApi.reducer,
  [Registery_Login_Api.reducerPath]: Registery_Login_Api.reducer,
  [UnsplashTextApi.reducerPath]: UnsplashTextApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(UnsplashTextApi.middleware)
        .concat(PlaceHolderApi.middleware)
        .concat(Registery_Login_Api.middleware),
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
