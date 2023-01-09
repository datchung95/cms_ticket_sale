import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';

interface modalChangeDateValue {
    openModal: boolean,
    id: string,
    soVe: string,
    tenSuKien: string,
    checkIn: string
}

interface DataTicketManagementFamily {
    congCheckIn: string;
    doiSoat: boolean;
    ngaySuDung: string;
    ngayXuatVe: string;
    soVe: string;
    tinhTrangSuDung: string;
    id: string;
}

interface DataTicketManagementEvent {
    congCheckIn: string;
    doiSoat: boolean;
    ngaySuDung: string;
    ngayXuatVe: string;
    soVe: string;
    tinhTrangSuDung: string;
    tenSuKien: string;
    id: string;
}


let ModalChangeDateValue: modalChangeDateValue = {
    openModal: false,
    id: "",
    soVe: "",
    tenSuKien: "",
    checkIn: ""
}

let arrDataTicketManagementFamily: DataTicketManagementFamily[] = [
    {
        congCheckIn: "",
        doiSoat: false,
        ngaySuDung: "",
        ngayXuatVe: "",
        soVe: "",
        tinhTrangSuDung: "",
        id: ""
    }
]

let arrDataTicketManagementEvent: DataTicketManagementEvent[] = [
    {
        congCheckIn: "",
        doiSoat: false,
        ngaySuDung: "",
        ngayXuatVe: "",
        soVe: "",
        tinhTrangSuDung: "",
        tenSuKien: "",
        id: ""
    }
]

let changePackage: boolean = false

const initialState = {
    changePackage: changePackage,
    modalChangeValue: ModalChangeDateValue,
    arrDataTicketManagementFamily: arrDataTicketManagementFamily,
    arrDataTicketManagementEvent: arrDataTicketManagementEvent
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
        },
        getAllDataTicketFamilyManagementReducer: (state, action) => {
            state.arrDataTicketManagementFamily = action.payload
        },
        getAllDataTicketEventManagementReducer: (state, action) => {
            state.arrDataTicketManagementEvent = action.payload
        },
        filterTicketManagementReducer: (state, action) => {
            if (action.payload.pickerTicketManagementStart !== "" && action.payload.pickerTicketManagementEnd !== "") {
                let arrDateEndFilterFamily = state.arrDataTicketManagementFamily.filter(item => item.ngaySuDung === action.payload.pickerTicketManagementEnd)
                let arrDateStartFilterFamily = arrDateEndFilterFamily.filter(item => dayjs(item.ngayXuatVe) <= dayjs(action.payload.pickerTicketManagementStart))

                let arrDateEndFilterEvent = state.arrDataTicketManagementEvent.filter(item => item.ngaySuDung === action.payload.pickerTicketManagementEnd)
                let arrDateStartFilterEvent = arrDateEndFilterEvent.filter(item => dayjs(item.ngayXuatVe) <= dayjs(action.payload.pickerTicketManagementStart))

                if (action.payload.tinhTrangSuDungRadio !== "Tất cả") {
                    let arrStatusFilterFamily = arrDateStartFilterFamily.filter(item => item.tinhTrangSuDung === action.payload.tinhTrangSuDungRadio)

                    let arrStatusFilterEvent = arrDateStartFilterEvent.filter(item => item.tinhTrangSuDung === action.payload.tinhTrangSuDungRadio)

                    if (!action.payload.cong.congTatCa) {
                        let arrCheckInFilterFamily: any[] = []

                        let arrCheckInFilterEvent: any[] = []

                        for (let i in action.payload.cong) {
                            if (i !== "congTatCa") {
                                if (action.payload.cong[i]) {
                                    for (let j in arrStatusFilterFamily) {
                                        if (arrStatusFilterFamily[j].congCheckIn === i) {
                                            arrCheckInFilterFamily.push(arrStatusFilterFamily[j])
                                        }
                                    }

                                    for (let j in arrStatusFilterEvent) {
                                        if (arrStatusFilterEvent[j].congCheckIn === i) {
                                            arrCheckInFilterEvent.push(arrStatusFilterEvent[j])
                                        }
                                    }
                                }
                            }
                        }
                        state.arrDataTicketManagementFamily = arrCheckInFilterFamily
                        state.arrDataTicketManagementEvent = arrCheckInFilterEvent
                    } else {
                        state.arrDataTicketManagementFamily = arrStatusFilterFamily
                        state.arrDataTicketManagementEvent = arrStatusFilterEvent
                    }

                } else {
                    if (!action.payload.cong.congTatCa) {
                        let arrCheckInFilterFamily: any[] = []

                        let arrCheckInFilterEvent: any[] = []
                        for (let i in action.payload.cong) {
                            if (i !== "congTatCa") {
                                if (action.payload.cong[i]) {
                                    for (let j in arrDateStartFilterFamily) {
                                        if (arrDateStartFilterFamily[j].congCheckIn === i) {
                                            arrCheckInFilterFamily.push(arrDateStartFilterFamily[j])
                                        }
                                    }

                                    for (let j in arrDateStartFilterEvent) {
                                        if (arrDateStartFilterEvent[j].congCheckIn === i) {
                                            arrCheckInFilterEvent.push(arrDateStartFilterEvent[j])
                                        }
                                    }
                                }
                            }
                        }
                        state.arrDataTicketManagementFamily = arrCheckInFilterFamily
                        state.arrDataTicketManagementEvent = arrCheckInFilterEvent
                    } else {
                        state.arrDataTicketManagementFamily = arrDateStartFilterFamily
                        state.arrDataTicketManagementEvent = arrDateStartFilterEvent
                    }
                }

            } else {
                if (action.payload.tinhTrangSuDungRadio !== "Tất cả") {
                    let arrStatusFilterFamily = state.arrDataTicketManagementFamily.filter(item => item.tinhTrangSuDung === action.payload.tinhTrangSuDungRadio)

                    let arrStatusFilterEvent = state.arrDataTicketManagementEvent.filter(item => item.tinhTrangSuDung === action.payload.tinhTrangSuDungRadio)

                    if (!action.payload.cong.congTatCa) {
                        let arrCheckInFilterFamily: any[] = []

                        let arrCheckInFilterEvent: any[] = []

                        for (let i in action.payload.cong) {
                            if (i !== "congTatCa") {
                                if (action.payload.cong[i]) {
                                    for (let j in arrStatusFilterFamily) {
                                        if (arrStatusFilterFamily[j].congCheckIn === i) {
                                            arrCheckInFilterFamily.push(arrStatusFilterFamily[j])
                                        }
                                    }

                                    for (let j in arrStatusFilterEvent) {
                                        if (arrStatusFilterEvent[j].congCheckIn === i) {
                                            arrCheckInFilterEvent.push(arrStatusFilterEvent[j])
                                        }
                                    }
                                }
                            }
                        }
                        state.arrDataTicketManagementFamily = arrCheckInFilterFamily
                        state.arrDataTicketManagementEvent = arrCheckInFilterEvent
                    } else {
                        state.arrDataTicketManagementFamily = arrStatusFilterFamily
                        state.arrDataTicketManagementEvent = arrStatusFilterEvent
                    }

                } else {
                    if (!action.payload.cong.congTatCa) {
                        let arrCheckInFilterFamily: any[] = []

                        let arrCheckInFilterEvent: any[] = []

                        for (let i in action.payload.cong) {
                            if (i !== "congTatCa") {
                                if (action.payload.cong[i]) {
                                    for (let j in state.arrDataTicketManagementFamily) {
                                        if (state.arrDataTicketManagementFamily[j].congCheckIn === i) {
                                            arrCheckInFilterFamily.push(state.arrDataTicketManagementFamily[j])
                                        }
                                    }

                                    for (let j in state.arrDataTicketManagementEvent) {
                                        if (state.arrDataTicketManagementEvent[j].congCheckIn === i) {
                                            arrCheckInFilterEvent.push(state.arrDataTicketManagementEvent[j])
                                        }
                                    }
                                }
                            }
                        }
                        state.arrDataTicketManagementFamily = arrCheckInFilterFamily
                        state.arrDataTicketManagementEvent = arrCheckInFilterEvent
                    }
                }
            }
        },
    }
});

export const {
    openModalReducer,
    changeTicketManagementPackageReducer,
    getAllDataTicketFamilyManagementReducer,
    getAllDataTicketEventManagementReducer,
    filterTicketManagementReducer

} = TicketManagementReducer.actions

export default TicketManagementReducer.reducer