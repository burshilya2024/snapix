// store.ts
import { useDispatch } from 'react-redux'

import { googleAuth } from '@/4_features/Authorization/GoogleAuth/api/googleAuth'
import { PasswordRecovery_Api } from '@/4_features/Authorization/PasswordRecovery/api/PasswordRecovery_Api'
import { Register_Login_Api } from '@/4_features/Authorization/Register_Login_User/api/register_Login_Api'
import { MyProfile_Api } from '@/4_features/MyProfile/api/MyProfile_Api'
import { userApiAvatar } from '@/4_features/MyProfile/components/UserAvatar/api/Avatar_Api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { UnsplashTextApi } from '../../4_features/public/api/UnsplashTestApi'
import { PlaceHolderApi } from './PlaceholderTestApi'

const rootReducer = combineReducers({
  [MyProfile_Api.reducerPath]: MyProfile_Api.reducer,
  [PasswordRecovery_Api.reducerPath]: PasswordRecovery_Api.reducer,
  [PlaceHolderApi.reducerPath]: PlaceHolderApi.reducer,
  [Register_Login_Api.reducerPath]: Register_Login_Api.reducer,
  [UnsplashTextApi.reducerPath]: UnsplashTextApi.reducer,
  [googleAuth.reducerPath]: googleAuth.reducer,
  [userApiAvatar.reducerPath]: userApiAvatar.reducer,
})

export const setupStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(UnsplashTextApi.middleware)
        .concat(PlaceHolderApi.middleware)
        .concat(Register_Login_Api.middleware)
        .concat(PasswordRecovery_Api.middleware)
        .concat(googleAuth.middleware)
        .concat(MyProfile_Api.middleware)
        .concat(userApiAvatar.middleware),
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
