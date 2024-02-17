// store.ts
import { useDispatch } from 'react-redux'

import { Registery_Login_Api } from '@/4_features/Registery_Login_User/api/registery_Login_Api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { UnsplashTextApi } from '../../4_features/public/api/UnsplashTestApi'
import { PlaceHolderApi } from './PlaceholderTestApi'
import { PasswordRecovery_Api } from '@/4_features/PasswordRecovery/api/PasswordRecovery_Api'

const rootReducer = combineReducers({
  [PlaceHolderApi.reducerPath]: PlaceHolderApi.reducer,
  [Registery_Login_Api.reducerPath]: Registery_Login_Api.reducer,
  [UnsplashTextApi.reducerPath]: UnsplashTextApi.reducer,
  [PasswordRecovery_Api.reducerPath]: PasswordRecovery_Api.reducer,
})

export const setupStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(UnsplashTextApi.middleware)
        .concat(PlaceHolderApi.middleware)
        .concat(Registery_Login_Api.middleware)
        .concat(PasswordRecovery_Api.middleware),
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
