import { Checkbox, Input, TimePicker } from 'antd'
import React from 'react'
import DatePickerCom from '../../../Component/DatePicker/DatePickerCom'
import { TimePickerProps, Select } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useFormik } from 'formik';
import "./AddTicketPackage.scss"
import { useNavigate } from 'react-router-dom';

export default function AddTicketPackage() {

    const navigate = useNavigate()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            giaVe: {
                veLe: false,
                combo: false
            }
        },
        onSubmit: (value) => {
            console.log(value)
        }
    })

    const onChangeCheckbox = (name: string, e: CheckboxChangeEvent) => {
        formik.setFieldValue(name, e.target.checked)
    };

    const onChangeTimePicker: TimePickerProps['onChange'] = (time, timeString) => {

    };

    const handleChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='outlet' id="add-ticket-package">
            <div className='outlet-content add-ticket-package-top'>
                <h2 className='add-ticket-package-title'>Thêm gói vé</h2>
                <form className='container-fluid' onSubmit={formik.handleSubmit}>
                    <div className='row add-ticket-package-name'>
                        <div className='col-6'>
                            <p className='add-ticket-package-text'>Tên gói vé <span>*</span></p>
                            <Input className='add-ticket-package-name-input' placeholder='Nhập tên gói vé' />
                        </div>
                        <div className='col-6'></div>
                    </div>
                    <div className='row add-ticket-package-date'>
                        <div className='col-6 add-ticket-package-date-start'>
                            <p className='add-ticket-package-text'>Ngày áp dụng</p>
                            <DatePickerCom popupName={"add-ticket-package-start"} format={"DD/MM/YYYY"} value={null} />
                            <TimePicker
                                popupClassName='time-picker-dropdown'
                                className='add-ticket-package-date-start-time time-picker'
                                onChange={onChangeTimePicker}
                                suffixIcon={<img src={require("../../../Assets/CalendarIcon/icontime.png")} alt="time" />}
                                placeholder="hh:mm:ss" />
                        </div>
                        <div className='col-6 add-ticket-package-date-end'>
                            <p className='add-ticket-package-text'>Ngày hết hạn</p>
                            <DatePickerCom popupName={"add-ticket-package-end"} format={"DD/MM/YYYY"} value={null} />
                            <TimePicker
                                popupClassName='time-picker-dropdown'
                                className='add-ticket-package-date-end-time time-picker'
                                onChange={onChangeTimePicker}
                                suffixIcon={<img src={require("../../../Assets/CalendarIcon/icontime.png")} alt="time" />}
                                placeholder="hh:mm:ss" />
                        </div>
                    </div>
                    <div className='add-ticket-package-price'>
                        <p className='add-ticket-package-text'>Giá vé áp dụng</p>
                        <div className='add-ticket-package-price-top'>
                            <Checkbox onChange={(e) => { onChangeCheckbox("giaVe.veLe", e) }} checked={formik.values.giaVe.veLe}>Vé lẻ (vnđ/vé) với giá</Checkbox>
                            {formik.values.giaVe.veLe ? <Input
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
                            <Checkbox onChange={(e) => { onChangeCheckbox("giaVe.combo", e) }} checked={formik.values.giaVe.combo}>Combo vé với giá</Checkbox>
                            {formik.values.giaVe.combo ? <Input
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

                            {formik.values.giaVe.combo ? <Input
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
                            defaultValue="Đang áp dụng"
                            style={{ width: 176 }}
                            onChange={handleChangeSelect}
                            options={[
                                {
                                    value: 'Đang áp dụng',
                                    label: 'Đang áp dụng',
                                },
                                {
                                    value: 'Đã tắt',
                                    label: 'Đã tắt',
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
