import { createSlice } from '@reduxjs/toolkit'

interface DataPackage {
    id: string;
    tenGoi: string;
    ngayApDungGoi: string;
    ngayKetThucGoi: string;
    gioApDungGoi: string;
    gioKetThucGoi: string;
    tinhTrang: string;
    giaVe: number;
    giaCombo: number;
    tenSuKien: string;
    comboVe: number;
    maSuKien: string;
}

let arrDataPackage: DataPackage[] = [
    {
        id: "",
        tenGoi: "",
        ngayApDungGoi: "",
        ngayKetThucGoi: "",
        tinhTrang: "",
        giaVe: 0,
        giaCombo: 0,
        tenSuKien: "",
        comboVe: 0,
        gioApDungGoi: "",
        gioKetThucGoi: "",
        maSuKien: ""
    }
]

let detailPackage: DataPackage = {
    id: "",
    tenGoi: "",
    ngayApDungGoi: "",
    ngayKetThucGoi: "",
    tinhTrang: "",
    giaVe: 0,
    giaCombo: 0,
    tenSuKien: "",
    comboVe: 0,
    gioApDungGoi: "",
    gioKetThucGoi: "",
    maSuKien: ""
}

const initialState = {
    arrDataPackage: arrDataPackage,
    arrPackageUsed: arrDataPackage,
    detailPackage: detailPackage
}

const TicketPackageReducer = createSlice({
    name: "TicketPackageReducer",
    initialState,
    reducers: {
        getAllDataTicketPackageReducer: (state, action) => {
            state.arrDataPackage = action.payload
            state.arrPackageUsed = state.arrDataPackage.filter(item => item.tinhTrang === "Đang áp dụng")
        },
        getDetailDataPackageReducer: (state, action) => {
            state.detailPackage = action.payload
        }
    }
});

export const {
    getAllDataTicketPackageReducer,
    getDetailDataPackageReducer
} = TicketPackageReducer.actions

export default TicketPackageReducer.reducer