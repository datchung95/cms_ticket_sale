import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';

interface DataTicketControl {
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

let arrDataTicketControl: DataTicketControl[] = [
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

const initialState = {
    arrDataTicketControlFamily: arrDataTicketControl,
    arrDataTicketControlEvent: arrDataTicketControl
}

const TicketControlReducer = createSlice({
    name: "TicketControlReducer",
    initialState,
    reducers: {
        getAllDataTicketFamilyControlReducer: (state, action) => {
            state.arrDataTicketControlFamily = action.payload
        },
        getAllDataTicketEventControlReducer: (state, action) => {
            state.arrDataTicketControlEvent = action.payload
        }, 
        searchTicketControlReducer: (state, action) => {
            if (action.payload.search !== "") {
                state.arrDataTicketControlFamily = state.arrDataTicketControlFamily.filter(item => item.soVe === action.payload.search)
                state.arrDataTicketControlEvent = state.arrDataTicketControlEvent.filter(item => item.soVe === action.payload.search)
            }
        },
        filterDataTicketControlReducer: (state, action) => {
            if (action.payload.ticketControlPickerStart !== "" && action.payload.ticketControlPickerEnd !== "") {
                let arrDateEndFilterFamily = state.arrDataTicketControlFamily.filter(item => dayjs(item.ngaySuDung, "DD/MM/YYYY") <= dayjs(action.payload.ticketControlPickerEnd, "DD/MM/YYYY"))
                let arrDateStartFilterFamily = arrDateEndFilterFamily.filter(item => dayjs(item.ngayXuatVe, "DD/MM/YYYY") >= dayjs(action.payload.ticketControlPickerStart, "DD/MM/YYYY"))

        
                let arrDateEndFilterEvent = state.arrDataTicketControlEvent.filter(item => dayjs(item.ngaySuDung, "DD/MM/YYYY") <= dayjs(action.payload.ticketControlPickerEnd, "DD/MM/YYYY"))
                let arrDateStartFilterEvent = arrDateEndFilterEvent.filter(item => dayjs(item.ngayXuatVe, "DD/MM/YYYY") >= dayjs(action.payload.ticketControlPickerStart, "DD/MM/YYYY"))

                if (action.payload.tinhTrangDoiSoatRadio === "Đã đối soát") {
                    let arrRadioCompleteFamily = arrDateStartFilterFamily.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = arrDateStartFilterEvent.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                } else if (action.payload.tinhTrangDoiSoatRadio === "Chưa đối soát") {
                    let arrRadioCompleteFamily = arrDateStartFilterFamily.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = arrDateStartFilterEvent.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                } else {
                    state.arrDataTicketControlFamily = arrDateStartFilterFamily

                    state.arrDataTicketControlEvent = arrDateStartFilterEvent
                }
            }

            if (action.payload.ticketControlPickerStart === "" && action.payload.ticketControlPickerEnd === "") {
                if (action.payload.tinhTrangDoiSoatRadio === "Đã đối soát") {
                    let arrRadioCompleteFamily = state.arrDataTicketControlFamily.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = state.arrDataTicketControlEvent.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                } else if (action.payload.tinhTrangDoiSoatRadio === "Chưa đối soát") {
                    let arrRadioCompleteFamily = state.arrDataTicketControlFamily.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = state.arrDataTicketControlEvent.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                }
            }

            if (action.payload.ticketControlPickerStart !== "" && action.payload.ticketControlPickerEnd === "") {
                let arrDateStartFilterFamily = state.arrDataTicketControlFamily.filter(item => item.ngayXuatVe === action.payload.ticketControlPickerStart)

                let arrDateStartFilterEvent = state.arrDataTicketControlEvent.filter(item => item.ngayXuatVe === action.payload.ticketControlPickerStart)

                if (action.payload.tinhTrangDoiSoatRadio === "Đã đối soát") {
                    let arrRadioCompleteFamily = arrDateStartFilterFamily.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = arrDateStartFilterEvent.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                } else if (action.payload.tinhTrangDoiSoatRadio === "Chưa đối soát") {
                    let arrRadioCompleteFamily = arrDateStartFilterFamily.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = arrDateStartFilterEvent.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                } else {
                    state.arrDataTicketControlFamily = arrDateStartFilterFamily

                    state.arrDataTicketControlEvent = arrDateStartFilterEvent
                }
            }

            if (action.payload.ticketControlPickerStart === "" && action.payload.ticketControlPickerEnd !== "") {
                let arrDateEndFilterFamily = state.arrDataTicketControlFamily.filter(item => item.ngaySuDung === action.payload.ticketControlPickerEnd)

                let arrDateEndFilterEvent = state.arrDataTicketControlEvent.filter(item => item.ngaySuDung === action.payload.ticketControlPickerEnd)

                if (action.payload.tinhTrangDoiSoatRadio === "Đã đối soát") {
                    let arrRadioCompleteFamily = arrDateEndFilterFamily.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = arrDateEndFilterEvent.filter(item => item.doiSoat === true)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                } else if (action.payload.tinhTrangDoiSoatRadio === "Chưa đối soát") {
                    let arrRadioCompleteFamily = arrDateEndFilterFamily.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlFamily = arrRadioCompleteFamily

                    let arrRadioCompleteEvent = arrDateEndFilterEvent.filter(item => item.doiSoat === false)
                    state.arrDataTicketControlEvent = arrRadioCompleteEvent
                } else {
                    state.arrDataTicketControlFamily = arrDateEndFilterFamily

                    state.arrDataTicketControlEvent = arrDateEndFilterEvent
                }
            }
        }
    }
});

export const {
    getAllDataTicketFamilyControlReducer, 
    getAllDataTicketEventControlReducer,
    filterDataTicketControlReducer,
    searchTicketControlReducer
 } = TicketControlReducer.actions

export default TicketControlReducer.reducer