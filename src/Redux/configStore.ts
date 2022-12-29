import { configureStore } from '@reduxjs/toolkit'
import HomeReducer from './Reducers/HomeReducer/HomeReducer'
import CalendarReducer from './Reducers/CalendarReducer/CalendarReducer'

export const store = configureStore({
    reducer: {
        HomeReducer,
        CalendarReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch