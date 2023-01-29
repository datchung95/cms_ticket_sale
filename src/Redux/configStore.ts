import { configureStore } from '@reduxjs/toolkit'
import HomeReducer from './Reducers/HomeReducer/HomeReducer'
import CalendarReducer from './Reducers/CalendarReducer/CalendarReducer'
import TicketManagementReducer from './Reducers/TicketManagementReducer/TicketManagementReducer'
import TicketControlReducer from './Reducers/TicketControlReducer/TicketControlReducer'
import TicketPackageReducer from './Reducers/TicketPackageReducer/TicketPackageReducer'

export const store = configureStore({
    reducer: {
        HomeReducer,
        CalendarReducer,
        TicketManagementReducer,
        TicketControlReducer,
        TicketPackageReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch