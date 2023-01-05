import { createSlice } from '@reduxjs/toolkit'

interface modalChangeDateValue {
    openModal: boolean,
    soVe: string,
    tenSuKien: string,
    checkIn: string
}

let ModalChangeDateValue: modalChangeDateValue = {
    openModal: false,
    soVe: "",
    tenSuKien: "",
    checkIn: ""
}

let changePackage: boolean = false

const initialState = {
    changePackage: changePackage,
    modalChangeValue: ModalChangeDateValue
}

const TicketManagementReducer = createSlice({
    name: "TicketManagementReducer",
    initialState,
    reducers: {
        openModalReducer: (state, action) => {
            state.modalChangeValue = action.payload
        },
        changeTicketManagementPackageReducer: (state, action) => {
            state.changePackage = action.payload
        }
    }
});

export const { 
    openModalReducer,
    changeTicketManagementPackageReducer
} = TicketManagementReducer.actions

export default TicketManagementReducer.reducer