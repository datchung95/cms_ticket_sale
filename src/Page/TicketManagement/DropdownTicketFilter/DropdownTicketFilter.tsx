import { useFormik } from 'formik'
import React from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { DatePickerProps } from 'antd';
import { Radio, Checkbox } from 'antd';
import DatePickerCom from '../../../Component/DatePicker/DatePickerCom';
import { useAppDispatch } from '../../../Redux/hook';
import dayjs from 'dayjs';
import { filterTicketManagementReducer, getAllDataTicketEventManagementReducer, getAllDataTicketFamilyManagementReducer } from '../../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import { getAllDataAction } from '../../../Redux/Actions/GetAllData/GetAllDataAction';
import { TICKETEVENT, TICKETFAMILY } from '../../../Const/Const';

interface DropdownShow {
    show: boolean
}

export default function DropdownTicketFilter(props: DropdownShow) {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cong: {
                congTatCa: true,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
            },
            tinhTrangSuDungRadio: "Tất cả",
            pickerTicketManagementStart: "",
            pickerTicketManagementEnd: ""
        },
        onSubmit: async (value) => {
            await dispatch(getAllDataAction(TICKETFAMILY, getAllDataTicketFamilyManagementReducer));
            await dispatch(getAllDataAction(TICKETEVENT, getAllDataTicketEventManagementReducer));
            dispatch(filterTicketManagementReducer(value))
        }
    })

    const onChangeCheckbox = (name: string, e: CheckboxChangeEvent) => {
        formik.setFieldValue(name, e.target.checked)
        if (name === "cong.congTatCa") {
            formik.setFieldValue("cong.1", false)
            formik.setFieldValue("cong.2", false)
            formik.setFieldValue("cong.3", false)
            formik.setFieldValue("cong.4", false)
            formik.setFieldValue("cong.5", false)
        } else {
            formik.setFieldValue("cong.congTatCa", false)
        }
    };

    const onChangeDatePickerStart: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString !== "") {
            formik.setFieldValue("pickerTicketManagementStart", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("pickerTicketManagementStart", "")
        }
    };

    const onChangeDatePickerEnd: DatePickerProps['onChange'] = (date, dateString) => {     
        if (dateString !== "") {
            formik.setFieldValue("pickerTicketManagementEnd", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("pickerTicketManagementEnd", "")
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className={`dropdown-menu ticket-management-dropdown-menu ${props.show ? "show" : ""}`}>
            <h4 className='ticket-management-dropdown-title'>Lọc vé</h4>
            <div className='ticket-management-dropdown-item'>
                <div className='ticket-management-datepicker'>
                    <div className='ticket-management-datepicker-start'>
                        <p>Từ ngày</p>
                        <DatePickerCom name={"pickerTicketManagementStart"} onChangeDatePicker={onChangeDatePickerStart} popupName={"picker-ticket-management-start"} format={"DD/MM/YYYY"} value={null} />
                    </div>
                    <div className='ticket-management-datepicker-end'>
                        <p>Đến ngày</p>
                        <DatePickerCom name={"pickerTicketManagementEnd"} onChangeDatePicker={onChangeDatePickerEnd} popupName={"picker-ticket-management-end"} format={"DD/MM/YYYY"} value={null} />
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
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong.congTatCa", e) }} checked={formik.values.cong.congTatCa}>Tất cả</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong.1", e) }} checked={formik.values.cong[1]}>Cổng 1</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong.2", e) }} checked={formik.values.cong[2]}>Cổng 2</Checkbox>
                            </div>
                        </div>
                        <div className='ticket-management-checkbox row'>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong.3", e) }} checked={formik.values.cong[3]}>Cổng 3</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong.4", e) }} checked={formik.values.cong[4]}>Cổng 4</Checkbox>
                            </div>
                            <div className='col-4'>
                                <Checkbox onChange={(e) => { onChangeCheckbox("cong.5", e) }} checked={formik.values.cong[5]}>Cổng 5</Checkbox>
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
