import { Checkbox, Input, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import DatePickerCom from '../../../Component/DatePicker/DatePickerCom'
import { TimePickerProps, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import { useFormik } from 'formik';
import "./UpdateTicketPackage.scss"
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { getAllDataTicketPackageReducer, getDetailDataPackageReducer } from '../../../Redux/Reducers/TicketPackageReducer/TicketPackageReducer';
import { getDetailDataAction } from '../../../Redux/Actions/GetAllData/GetAllDataAction';
import { PACKAGE } from '../../../Const/Const';
import { updatePackageDocumentAction } from '../../../Redux/Actions/UpdateData/UpdateDataAction';

export default function UpdateTicketPackage() {

    const navigate = useNavigate()

    const param = useParams()

    const dispatch = useAppDispatch()

    const { detailPackage } = useAppSelector(state => state.TicketPackageReducer)

    const [chonGiaVe, setChonGiaVe] = useState(false)

    const [chonGiaCombo, setChonGiaCombo] = useState(false)

    useEffect(() => {
        dispatch(getDetailDataAction(PACKAGE, getDetailDataPackageReducer, param.id))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            giaVe: detailPackage.giaVe,
            giaCombo: detailPackage.giaCombo,
            comboVe: detailPackage.comboVe,
            tenGoi: detailPackage.tenGoi,
            tinhTrang: detailPackage.tinhTrang,
            ngayApDungGoi: detailPackage.ngayApDungGoi,
            ngayKetThucGoi: detailPackage.ngayKetThucGoi,
            gioApDungGoi: detailPackage.gioApDungGoi,
            gioKetThucGoi: detailPackage.gioKetThucGoi,
            maSuKien: detailPackage.maSuKien,
            tenSuKien: detailPackage.tenSuKien
        },
        validationSchema: Yup.object().shape({
            tenGoi: Yup.string().trim().required("T??n g??i v?? l?? tr?????ng b???t bu???c")
        }),
        onSubmit: (value) => {
            dispatch(updatePackageDocumentAction(PACKAGE, detailPackage.id, value, getAllDataTicketPackageReducer))
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
        <div className='outlet' id="update-ticket-package">
            <div className='outlet-content update-ticket-package-top'>
                <h2 className='update-ticket-package-title'>C???p nh???t th??ng tin g??i v??</h2>
                <form className='container-fluid' onSubmit={formik.handleSubmit}>
                    {detailPackage.maSuKien !== ""
                        ?
                        <div className='row update-ticket-package-event'>
                            <div className='col-6'>
                                <p className='update-ticket-package-text'>M?? s??? ki???n <span>*</span></p>
                                <Input name="tenGoi" onChange={formik.handleChange} className='update-ticket-package-event-input' placeholder='Nh???p m?? s??? ki???n' value={formik.values.maSuKien} />
                                {formik.touched.maSuKien && <p className='text-danger'>{formik.errors.maSuKien}</p>}
                            </div>
                            <div className='col-6'>
                                <p className='update-ticket-package-text'>T??n s??? ki???n</p>
                                <Input name="tenGoi" onChange={formik.handleChange} className='update-ticket-package-name-input' placeholder='Nh???p t??n s??? ki???n' value={formik.values.tenSuKien} />
                            </div>
                        </div>
                        :
                        <div></div>}
                    {detailPackage.maSuKien === ""
                        ?
                        <div className='row update-ticket-package-name'>
                            <div className='col-6'>
                                <p className='update-ticket-package-text'>T??n g??i v?? <span>*</span></p>
                                <Input name="tenGoi" onChange={formik.handleChange} className='update-ticket-package-name-input' placeholder='Nh???p t??n g??i v??' value={formik.values.tenGoi} />
                                {formik.touched.tenGoi && <p className='text-danger'>{formik.errors.tenGoi}</p>}
                            </div>
                            <div className='col-6'></div>
                        </div>
                        :
                        <div></div>
                    }
                    <div className='row update-ticket-package-date'>
                        <div className='col-6 update-ticket-package-date-start'>
                            <p className='update-ticket-package-text'>Ng??y ??p d???ng</p>
                            <DatePickerCom onChangeDatePicker={onChangeDatePickerStart} name={"updateTicketPickerStart"} popupName={"update-ticket-package-start"} format={"DD/MM/YYYY"} value={dayjs(formik.values.ngayApDungGoi, "DD/MM/YYYY")} />
                            <TimePicker
                                name='timePickerStart'
                                popupClassName='time-picker-dropdown'
                                className='update-ticket-package-date-start-time time-picker'
                                onChange={onChangeTimePickerStart}
                                suffixIcon={<img src={require("../../../Assets/CalendarIcon/icontime.png")} alt="time" />}
                                placeholder={formik.values.gioApDungGoi} />
                        </div>
                        <div className='col-6 update-ticket-package-date-end'>
                            <p className='update-ticket-package-text'>Ng??y h???t h???n</p>
                            <DatePickerCom onChangeDatePicker={onChangeDatePickerEnd} name={"updateTicketPickerEnd"} popupName={"update-ticket-package-end"} format={"DD/MM/YYYY"} value={dayjs(formik.values.ngayKetThucGoi, "DD/MM/YYYY")} />
                            <TimePicker
                                name='timePickerEnd'
                                popupClassName='time-picker-dropdown'
                                className='update-ticket-package-date-end-time time-picker'
                                onChange={onChangeTimePickerEnd}
                                suffixIcon={<img src={require("../../../Assets/CalendarIcon/icontime.png")} alt="time" />}
                                placeholder={formik.values.gioKetThucGoi} />
                        </div>
                    </div>
                    <div className='update-ticket-package-price'>
                        <p className='update-ticket-package-text'>Gi?? v?? ??p d???ng</p>
                        <div className='update-ticket-package-price-top'>
                            <Checkbox onChange={(e) => { setChonGiaVe(e.target.checked) }} checked={chonGiaVe}>V?? l??? (vn??/v??) v???i gi??</Checkbox>
                            {chonGiaVe ? <Input
                                onChange={formik.handleChange}
                                name="giaVe"
                                value={formik.values.giaVe}
                                type="number"
                                className='update-ticket-package-price-top-input'
                                disabled={false}
                                style={{ width: "148px", border: "1px solid #A5A8B1" }}
                                placeholder='Gi?? v??' />
                                :
                                <Input
                                    value={formik.values.giaVe}
                                    className='update-ticket-package-price-top-input'
                                    disabled={true}
                                    style={{ width: "148px", borderColor: "transparent" }}
                                    placeholder='Gi?? v??' />} / v??
                        </div>
                        <div className='update-ticket-package-price-bottom'>
                            <Checkbox onChange={(e) => { setChonGiaCombo(e.target.checked) }} checked={chonGiaCombo}>Combo v?? v???i gi??</Checkbox>
                            {chonGiaCombo ? <Input
                                onChange={formik.handleChange}
                                name="giaCombo"
                                value={formik.values.giaCombo}
                                type="number"
                                className='update-ticket-package-price-bottom-input'
                                disabled={false}
                                style={{ width: "148px", border: "1px solid #A5A8B1" }}
                                placeholder='Gi?? v??' />
                                :
                                <Input
                                    value={formik.values.giaCombo}
                                    className='update-ticket-package-price-bottom-input'
                                    disabled={true}
                                    style={{ width: "148px", borderColor: "transparent" }}
                                    placeholder='Gi?? v??' />} /

                            {chonGiaCombo ? <Input
                                onChange={formik.handleChange}
                                name="comboVe"
                                value={formik.values.comboVe}
                                type="number"
                                className='update-ticket-package-price-bottom-input-ticket'
                                disabled={false}
                                style={{ width: "78px", border: "1px solid #A5A8B1" }}
                                placeholder='V??' />
                                :
                                <Input
                                    className='update-ticket-package-price-bottom-input-ticket'
                                    value={formik.values.comboVe}
                                    disabled={true}
                                    style={{ width: "78px", borderColor: "transparent" }}
                                    placeholder='V??' />} / v??
                        </div>
                    </div>
                    <div className='update-ticket-package-price-status'>
                        <p className='update-ticket-package-text'>T??nh tr???ng</p>
                        <Select
                            className='update-ticket-package-price-status-select'
                            value={formik.values.tinhTrang}
                            style={{ width: 176 }}
                            onChange={handleChangeSelect}
                            suffixIcon={<img src={require("../../../Assets/ButtonIcon/Vector (8).png")} alt="icon" />}
                            options={[
                                {
                                    value: '??ang ??p d???ng',
                                    label: '??ang ??p d???ng',
                                },
                                {
                                    value: 'T???t',
                                    label: 'T???t',
                                }
                            ]}
                        />
                    </div>
                    <div className='update-ticket-package-note'>
                        <p className='update-ticket-package-note-star'>*</p>
                        <p className='update-ticket-package-note-info'>l?? th??ng tin b???t bu???c</p>
                    </div>
                    <div className='update-ticket-package-button'>
                        <button className='button-ouline-orange update-ticket-package-button-cancel' onClick={() => {
                            navigate("/setting")
                        }}>H???y</button>
                        <button type='submit' className='button-orange update-ticket-package-button-save'>L??u</button>
                    </div>
                </form>
            </div >
        </div >
    )
}
