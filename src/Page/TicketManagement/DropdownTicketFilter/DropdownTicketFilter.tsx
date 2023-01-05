import { useFormik } from 'formik'
import React from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Radio, Checkbox } from 'antd';
import DatePickerCom from '../../../Component/DatePicker/DatePickerCom';

export default function DropdownTicketFilter() {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            congTatCa: true,
            cong1: false,
            cong2: false,
            cong3: false,
            cong4: false,
            cong5: false,
            tinhTrangSuDungRadio: "Tất cả"
        },
        onSubmit: (value) => {
            console.log(value)
        }
    })

    const onChangeCheckbox = (name: string, e: CheckboxChangeEvent) => {
        formik.setFieldValue(name, e.target.checked)
        if (name === "congTatCa") {
            formik.setFieldValue("cong1", false)
            formik.setFieldValue("cong2", false)
            formik.setFieldValue("cong3", false)
            formik.setFieldValue("cong4", false)
            formik.setFieldValue("cong5", false)
        } else {
            formik.setFieldValue("congTatCa", false)
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="dropdown-menu ticket-management-dropdown-menu">
            <h4 className='ticket-management-dropdown-title'>Lọc vé</h4>
            <div className='ticket-management-dropdown-item'>
                <div className='ticket-management-datepicker'>
                    <div className='ticket-management-datepicker-start'>
                        <p>Từ ngày</p>
                        <DatePickerCom popupName={"picker-ticket-management-start"} format={"DD/MM/YYYY"} value={null} />
                    </div>
                    <div className='ticket-management-datepicker-end'>
                        <p>Đến ngày</p>
                        <DatePickerCom popupName={"picker-ticket-management-end"} format={"DD/MM/YYYY"} value={null} />
                    </div>
                </div>
                <div className='ticket-management-radio'>
                    <p>Tình trạng sử dụng</p>
                    <Radio.Group onChange={formik.handleChange} name="tinhTrangSuDungRadio" value={formik.values.tinhTrangSuDungRadio} className="d-flex justify-content-between">
                        <Radio value="Tất cả">Tất cả</Radio>
                        <Radio value="Đã sử dụng">Đã sử dụng</Radio>
                        <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
                        <Radio value="Hết hạn">Hết hạn</Radio>
                    </Radio.Group>
                </div>
                <div className='ticket-management-checkin'>
                    <p>Cổng Check-In</p>
                    <div className='container-fluid p-0'>
                        <div className='ticket-management-checkbox row'>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("congTatCa", e) }} checked={formik.values.congTatCa}>Tất cả</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong1", e) }} checked={formik.values.cong1}>Cổng 1</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong2", e) }} checked={formik.values.cong2}>Cổng 2</Checkbox>
                            </div>
                        </div>
                        <div className='ticket-management-checkbox row'>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong3", e) }} checked={formik.values.cong3}>Cổng 3</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong4", e) }} checked={formik.values.cong4}>Cổng 4</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong5", e) }} checked={formik.values.cong5}>Cổng 5</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ticket-management-submit'>
                    <button type='submit' className='button-ouline-orange'>Lọc</button>
                </div>
            </div>
        </form>
    )
}
