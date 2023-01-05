import { configureStore } from '@reduxjs/toolkit'
import HomeReducer from './Reducers/HomeReducer/HomeReducer'
import CalendarReducer from './Reducers/CalendarReducer/CalendarReducer'
import TicketManagementReducer from './Reducers/TicketManagementReducer/TicketManagementReducer'

export const store = configureStore({
    reducer: {
        HomeReducer,
        CalendarReducer,
        TicketManagementReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch