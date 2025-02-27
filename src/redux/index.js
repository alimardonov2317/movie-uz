import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth.slice'
import { mainApi } from './api'
import wishlist from './features/favouriteSlice'

export const store = configureStore({
  reducer: {
    auth,
    wishlist,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
})
