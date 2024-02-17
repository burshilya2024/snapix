// store.ts
import { useDispatch } from 'react-redux'

import { Register_Login_Api } from '@/4_features/Register_Login_User/api/Register_Login_Api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { UnsplashTextApi } from '../../4_features/public/api/UnsplashTestApi'
import { PlaceHolderApi } from './PlaceholderTestApi'
import { PasswordRecovery_Api } from '@/4_features/PasswordRecovery/api/PasswordRecovery_Api'

const rootReducer = combineReducers({
  [PasswordRecovery_Api.reducerPath]: PasswordRecovery_Api.reducer,
  [PlaceHolderApi.reducerPath]: PlaceHolderApi.reducer,
  [Register_Login_Api.reducerPath]: Register_Login_Api.reducer,
  [UnsplashTextApi.reducerPath]: UnsplashTextApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(UnsplashTextApi.middleware)
        .concat(PlaceHolderApi.middleware)
        .concat(Register_Login_Api.middleware)
        .concat(PasswordRecovery_Api.middleware),
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
