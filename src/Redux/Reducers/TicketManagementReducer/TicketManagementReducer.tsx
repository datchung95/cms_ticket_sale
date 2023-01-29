import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';

interface modalChangeDateValue {
    openModal: boolean,
    id: string,
    soVe: string,
    tenSuKien: string,
    checkIn: string
}

interface DataTicketManagement {
    congCheckIn: string;
    doiSoat: boolean;
    ngaySuDung: string;
    ngayXuatVe: string;
    soVe: string;
    tinhTrangSuDung: string;
    tenSuKien: string;
    id: string;
    tenLoaiVe: string;
    tenGoi: string;
}


let ModalChangeDateValue: modalChangeDateValue = {
    openModal: false,
    id: "",
    soVe: "",
    tenSuKien: "",
    checkIn: ""
}

let arrDataTicketManagement: DataTicketManagement[] = [
    {
        congCheckIn: "",
        doiSoat: false,
        ngaySuDung: "",
        ngayXuatVe: "",
        soVe: "",
        tinhTrangSuDung: "",
        id: "",
        tenLoaiVe: "",
        tenSuKien: "",
        tenGoi: ""
    }
]

let changePackage: string = ""

const initialState = {
    changePackage: changePackage,
    modalChangeValue: ModalChangeDateValue,
    arrDataTicketManagementFamily: arrDataTicketManagement,
    arrDataTicketManagementEvent: arrDataTicketManagement
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
        searchTicketManagementReducer: (state, action) => {
            if (action.payload.search !== "") {
                state.arrDataTicketManagementFamily = state.arrDataTicketManagementFamily.filter(item => item.soVe === action.payload.search.trim())
                state.arrDataTicketManagementEvent = state.arrDataTicketManagementEvent.filter(item => item.soVe === action.payload.search.trim())
            }
        },
        filterTicketManagementReducer: (state, action) => {
            if (action.payload.pickerTicketManagementStart !== "" && action.payload.pickerTicketManagementEnd !== "") {

                let arrDateEndFilterFamily = state.arrDataTicketManagementFamily.filter(item => dayjs(item.ngaySuDung, "DD/MM/YYYY") <= dayjs(action.payload.pickerTicketManagementEnd, "DD/MM/YYYY"))
                let arrDateStartFilterFamily = arrDateEndFilterFamily.filter(item => dayjs(item.ngayXuatVe, "DD/MM/YYYY") >= dayjs(action.payload.pickerTicketManagementStart, "DD/MM/YYYY"))


                let arrDateEndFilterEvent = state.arrDataTicketManagementEvent.filter(item => dayjs(item.ngaySuDung, "DD/MM/YYYY") <= dayjs(action.payload.pickerTicketManagementEnd, "DD/MM/YYYY"))
                let arrDateStartFilterEvent = arrDateEndFilterEvent.filter(item => dayjs(item.ngayXuatVe, "DD/MM/YYYY") >= dayjs(action.payload.pickerTicketManagementStart, "DD/MM/YYYY"))


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

            if (action.payload.pickerTicketManagementStart !== "" && action.payload.pickerTicketManagementEnd === "") {
                let arrDateStartFilterFamily = state.arrDataTicketManagementFamily.filter(item => item.ngayXuatVe === action.payload.pickerTicketManagementStart)

                let arrDateStartFilterEvent = state.arrDataTicketManagementEvent.filter(item => item.ngayXuatVe === action.payload.pickerTicketManagementStart)


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
            }

            if (action.payload.pickerTicketManagementStart === "" && action.payload.pickerTicketManagementEnd !== "") {
                let arrDateEndFilterFamily = state.arrDataTicketManagementFamily.filter(item => item.ngaySuDung === action.payload.pickerTicketManagementEnd)

                let arrDateEndFilterEvent = state.arrDataTicketManagementEvent.filter(item => item.ngayXuatVe === action.payload.pickerTicketManagementEnd)


                if (action.payload.tinhTrangSuDungRadio !== "Tất cả") {
                    let arrStatusFilterFamily = arrDateEndFilterFamily.filter(item => item.tinhTrangSuDung === action.payload.tinhTrangSuDungRadio)

                    let arrStatusFilterEvent = arrDateEndFilterEvent.filter(item => item.tinhTrangSuDung === action.payload.tinhTrangSuDungRadio)

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
                                    for (let j in arrDateEndFilterFamily) {
                                        if (arrDateEndFilterFamily[j].congCheckIn === i) {
                                            arrCheckInFilterFamily.push(arrDateEndFilterFamily[j])
                                        }
                                    }

                                    for (let j in arrDateEndFilterEvent) {
                                        if (arrDateEndFilterEvent[j].congCheckIn === i) {
                                            arrCheckInFilterEvent.push(arrDateEndFilterEvent[j])
                                        }
                                    }
                                }
                            }
                        }
                        state.arrDataTicketManagementFamily = arrCheckInFilterFamily
                        state.arrDataTicketManagementEvent = arrCheckInFilterEvent
                    } else {
                        state.arrDataTicketManagementFamily = arrDateEndFilterFamily
                        state.arrDataTicketManagementEvent = arrDateEndFilterEvent
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
    filterTicketManagementReducer,
    searchTicketManagementReducer

} = TicketManagementReducer.actions

export default TicketManagementReducer.reducer