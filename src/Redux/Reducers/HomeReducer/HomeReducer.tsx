import { createSlice } from '@reduxjs/toolkit'

let radioValue: boolean = true; 

const initialState = {
    radioValue: radioValue
}

const HomeReducer = createSlice({
    name: "HomeReducer",
    initialState,
    reducers: {
        setRadioValueReducer: (state, action) => {
            state.radioValue = action.payload;
        }
    }
});

export const { 
    setRadioValueReducer
} = HomeReducer.actions

export default HomeReducer.reducer