// store.ts
import { useDispatch } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { PlaceHolderApi } from './PlaceholderTestApi'
import { UnsplashTextApi } from './UnsplashTestApi'

const rootReducer = combineReducers({
  [PlaceHolderApi.reducerPath]: PlaceHolderApi.reducer,
  [UnsplashTextApi.reducerPath]: UnsplashTextApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(UnsplashTextApi.middleware).concat(PlaceHolderApi.middleware),
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
