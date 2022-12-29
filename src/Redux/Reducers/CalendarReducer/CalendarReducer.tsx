import { createSlice } from '@reduxjs/toolkit'

let valueCalendar: string = ""

const initialState = {
    valueCalendar: valueCalendar
}

const CalendarReducer = createSlice({
    name: "CalendarReducer",
    initialState,
    reducers: {
        setValueCalendarReducer: (state, action) => {
            state.valueCalendar = action.payload
        }
    }
});

export const { 
    setValueCalendarReducer
} = CalendarReducer.actions

export default CalendarReducer.reducer