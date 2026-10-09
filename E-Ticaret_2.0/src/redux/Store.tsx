import { configureStore } from '@reduxjs/toolkit'
import appReducer from './AppSlice.tsx'
import BasketReducer from './BasketSlice.tsx'
export const store = configureStore({
  reducer: {
    app:appReducer,
    basket:BasketReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch