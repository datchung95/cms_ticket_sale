import { Checkbox, Input, TimePicker } from 'antd'
import React, { useState } from 'react'
import DatePickerCom from '../../../Component/DatePicker/DatePickerCom'
import { TimePickerProps, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import { useFormik } from 'formik';
import "./AddTicketPackage.scss"
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import * as Yup from 'yup'
import { useAppDispatch } from '../../../Redux/hook';
import { addDocumentPackage } from '../../../Redux/Actions/AddData/AddDataAction';
import { getAllDataTicketPackageReducer } from '../../../Redux/Reducers/TicketPackageReducer/TicketPackageReducer';
import { PACKAGE } from '../../../Const/Const';

export default function AddTicketPackage() {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [chonGiaVe, setChonGiaVe] = useState(false)

    const [chonGiaCombo, setChonGiaCombo] = useState(false)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            giaVe: 0,
            giaCombo: 0,
            comboVe: 0,
            tenGoi: "",
            tinhTrang: "Đang áp dụng",
            ngayApDungGoi: "",
            ngayKetThucGoi: "",
            gioApDungGoi: "",
            gioKetThucGoi: "",
            maSuKien: "",
            tenSuKien: ""
        },
        validationSchema: Yup.object().shape({
            tenGoi: Yup.string().trim().required("Tên gói vé là trường bắt buộc")
        }),
        onSubmit: (value) => {
            dispatch(addDocumentPackage(PACKAGE, value, getAllDataTicketPackageReducer))
        }
    })

    const onChangeTimePickerStart: TimePickerProps['onChange'] = (time, timeString) => {
        if (timeString !== "") {
            formik.setFieldValue("gioApDungGoi", dayjs(time).format("HH:mm:ss"))
        } else {
            formik.setFieldValue("gioApDungGoi", "")
        }
    };

    const onChangeTimePickerEnd: TimePickerProps['onChange'] = (time, timeString) => {
        if (timeString !== "") {
            formik.setFieldValue("gioKetThucGoi", dayjs(time).format("HH:mm:ss"))
        } else {
            formik.setFieldValue("gioKetThucGoi", "")
        }
    };

    const handleChangeSelect = (value: string) => {
        formik.setFieldValue("tinhTrang", value)
    };

    const onChangeDatePickerStart: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString !== "") {
            formik.setFieldValue("ngayApDungGoi", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("ngayApDungGoi", "")
        }
    };

    const onChangeDatePickerEnd: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString !== "") {
            formik.setFieldValue("ngayKetThucGoi", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("ngayKetThucGoi", "")
        }
    };

    return (
        <div className='outlet' id="add-ticket-package">
            <div className='outlet-content add-ticket-package-top'>
                <h2 className='add-ticket-package-title'>Thêm gói vé</h2>
                <form className='container-fluid' onSubmit={formik.handleSubmit}>
                    <div className='row add-ticket-package-name'>
                        <div className='col-6'>
                            <p className='add-ticket-package-text'>Tên gói vé <span>*</span></p>
                            <Input name="tenGoi" onChange={formik.handleChange} className='add-ticket-package-name-input' placeholder='Nhập tên gói vé' />
                            {formik.touched.tenGoi && <p className='text-danger'>{formik.errors.tenGoi}</p>}
                        </div>
                        <div className='col-6'></div>
                    </div>
                    <div className='row add-ticket-package-date'>
                        <div className='col-6 add-ticket-package-date-start'>
                            <p className='add-ticket-package-text'>Ngày áp dụng</p>
                            <DatePickerCom onChangeDatePicker={onChangeDatePickerStart} name={"addTicketPickerStart"} popupName={"add-ticket-package-start"} format={"DD/MM/YYYY"} value={null} />
                            <TimePicker
                                name='timePickerStart'
                                popupClassName='time-picker-dropdown'
                                className='add-ticket-package-date-start-time time-picker'
                                onChange={onChangeTimePickerStart}
                                suffixIcon={<img src={require("../../../Assets/CalendarIcon/icontime.png")} alt="time" />}
                                placeholder="hh:mm:ss" />
                        </div>
                        <div className='col-6 add-ticket-package-date-end'>
                            <p className='add-ticket-package-text'>Ngày hết hạn</p>
                            <DatePickerCom onChangeDatePicker={onChangeDatePickerEnd} name={"addTicketPickerEnd"} popupName={"add-ticket-package-end"} format={"DD/MM/YYYY"} value={null} />
                            <TimePicker
                                name='timePickerEnd'
                                popupClassName='time-picker-dropdown'
                                className='add-ticket-package-date-end-time time-picker'
                                onChange={onChangeTimePickerEnd}
                                suffixIcon={<img src={require("../../../Assets/CalendarIcon/icontime.png")} alt="time" />}
                                placeholder="hh:mm:ss" />
                        </div>
                    </div>
                    <div className='add-ticket-package-price'>
                        <p className='add-ticket-package-text'>Giá vé áp dụng</p>
                        <div className='add-ticket-package-price-top'>
                            <Checkbox onChange={(e) => { setChonGiaVe(e.target.checked) }} checked={chonGiaVe}>Vé lẻ (vnđ/vé) với giá</Checkbox>
                            {chonGiaVe ? <Input
                                onChange={formik.handleChange}
                                name="giaVe"
                                type="number"
                                className='add-ticket-package-price-top-input'
                                disabled={false}
                                style={{ width: "148px", border: "1px solid #A5A8B1" }}
                                placeholder='Giá vé' />
                                :
                                <Input
                                    className='add-ticket-package-price-top-input'
                                    disabled={true}
                                    style={{ width: "148px", borderColor: "transparent" }}
                                    placeholder='Giá vé' />} / vé
                        </div>
                        <div className='add-ticket-package-price-bottom'>
                            <Checkbox onChange={(e) => { setChonGiaCombo(e.target.checked) }} checked={chonGiaCombo}>Combo vé với giá</Checkbox>
                            {chonGiaCombo ? <Input
                                onChange={formik.handleChange}
                                name="giaCombo"
                                type="number"
                                className='add-ticket-package-price-bottom-input'
                                disabled={false}
                                style={{ width: "148px", border: "1px solid #A5A8B1" }}
                                placeholder='Giá vé' />
                                :
                                <Input
                                    className='add-ticket-package-price-bottom-input'
                                    disabled={true}
                                    style={{ width: "148px", borderColor: "transparent" }}
                                    placeholder='Giá vé' />} /

                            {chonGiaCombo ? <Input
                                onChange={formik.handleChange}
                                name="comboVe"
                                type="number"
                                className='add-ticket-package-price-bottom-input-ticket'
                                disabled={false}
                                style={{ width: "78px", border: "1px solid #A5A8B1" }}
                                placeholder='Vé' />
                                :
                                <Input
                                    className='add-ticket-package-price-bottom-input-ticket'
                                    disabled={true}
                                    style={{ width: "78px", borderColor: "transparent" }}
                                    placeholder='Vé' />} / vé
                        </div>
                    </div>
                    <div className='add-ticket-package-price-status'>
                        <p className='add-ticket-package-text'>Tình trạng</p>
                        <Select
                            className='add-ticket-package-price-status-select'
                            defaultValue={formik.values.tinhTrang}
                            style={{ width: 176 }}
                            onChange={handleChangeSelect}
                            suffixIcon={<img src={require("../../../Assets/ButtonIcon/Vector (8).png")} alt="icon" />}
                            options={[
                                {
                                    value: 'Đang áp dụng',
                                    label: 'Đang áp dụng',
                                },
                                {
                                    value: 'Tắt',
                                    label: 'Tắt',
                                }
                            ]}
                        />
                    </div>
                    <div className='add-ticket-package-note'>
                        <p className='add-ticket-package-note-star'>*</p>
                        <p className='add-ticket-package-note-info'>là thông tin bắt buộc</p>
                    </div>
                    <div className='add-ticket-package-button'>
                        <button className='button-ouline-orange add-ticket-package-button-cancel' onClick={() => {
                            navigate("/setting")
                        }}>Hủy</button>
                        <button type='submit' className='button-orange add-ticket-package-button-save'>Lưu</button>
                    </div>
                </form>
            </div >
        </div >
    )
}
