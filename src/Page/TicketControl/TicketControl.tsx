import { Radio } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import DatePickerCom from '../../Component/DatePicker/DatePickerCom';
import FormSearch from '../../Component/FormSearch/FormSearch';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { changeTicketManagementPackageReducer } from '../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import type { DatePickerProps } from 'antd';
import "./TicketControl.scss"
import dayjs from 'dayjs';
import TicketEventControl from './TicketEventControl/TicketEventControl';
import TicketFamilyControl from './TicketFamilyControl/TicketFamilyControl';
import { filterDataTicketControlReducer, getAllDataTicketEventControlReducer, getAllDataTicketFamilyControlReducer } from '../../Redux/Reducers/TicketControlReducer/TicketControlReducer';
import { getAllDataAction } from '../../Redux/Actions/GetAllData/GetAllDataAction';
import DropdownControl from './DropdownControl/DropdownControl';
import { PACKAGE, TICKETEVENT, TICKETFAMILY } from '../../Const/Const';
import { getAllDataTicketPackageReducer } from '../../Redux/Reducers/TicketPackageReducer/TicketPackageReducer';

export default function TicketControl() {

    const dispatch = useAppDispatch()

    const { changePackage } = useAppSelector(state => state.TicketManagementReducer);

    const { arrPackageUsed } = useAppSelector(state => state.TicketPackageReducer)

    const { arrDataTicketControlEvent, arrDataTicketControlFamily } = useAppSelector(state => state.TicketControlReducer)

    const [showControlButton, setShowControlButton] = useState(false)

    useEffect(() => {
        dispatch(getAllDataAction(PACKAGE, getAllDataTicketPackageReducer))
    }, [])

    useEffect(() => {
        dispatch(changeTicketManagementPackageReducer(arrPackageUsed[0].tenGoi))
    }, [arrPackageUsed])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tinhTrangDoiSoatRadio: "T???t c???",
            ticketControlPickerStart: "",
            ticketControlPickerEnd: ""

        },
        onSubmit: async (value) => {
            await dispatch(getAllDataAction(TICKETFAMILY, getAllDataTicketFamilyControlReducer))
            await dispatch(getAllDataAction(TICKETEVENT, getAllDataTicketEventControlReducer))
            dispatch(filterDataTicketControlReducer(value))
        }
    })

    const onChangeDatePickerStart: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString !== "") {
            formik.setFieldValue("ticketControlPickerStart", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("ticketControlPickerStart", "")
        }
    };

    const onChangeDatePickerEnd: DatePickerProps['onChange'] = (date, dateString) => {
        formik.setFieldValue("ticketControlPickerEnd", dayjs(date).format("DD/MM/YYYY"))
        if (dateString !== "") {
            formik.setFieldValue("ticketControlPickerEnd", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("ticketControlPickerEnd", "")
        }
    };

    const renderTableTicketControl = () => {
        if (changePackage === "G??i s??? ki???n") {
            return <TicketEventControl />
        } else {
            return <TicketFamilyControl />
        }
    }

    const renderButtonPackage = () => {
        if (arrPackageUsed.length > 1) {
            return arrPackageUsed.map((item, index) => {
                return <p key={index} onClick={() => { dispatch(changeTicketManagementPackageReducer(item.tenGoi)) }} className={`${changePackage === item.tenGoi ? "button-package-active" : ""} button-package`}>{item.tenGoi}</p>
            })
        } else {
            return <></>
        }
    }

    const renderButtonForControl = () => {
        if (changePackage === "G??i s??? ki???n") {
            let arrFilterEvent = arrDataTicketControlEvent.filter(item => item.doiSoat === false)
            if (arrFilterEvent.length === 0) {
                return <button className='button-ouline-orange'>
                    Xu???t file (.csv)
                </button>
            } else {
                return (
                    <div className='position-relative'>
                        <button className='button-orange ticket-control-button-for-control' onClick={() => { setShowControlButton(!showControlButton) }}>Ch???t ?????i so??t</button>
                        <DropdownControl
                            showControl={showControlButton}
                            arrForControl={arrFilterEvent}
                            packageTicket="ticketEvent"
                        />
                    </div>
                )
            }
        } else {
            let arrFilterFamily = arrDataTicketControlFamily.filter(item => item.tenGoi === changePackage).filter(item => item.doiSoat === false)
            if (arrFilterFamily.length === 0) {
                return <button className='button-ouline-orange'>
                    Xu???t file (.csv)
                </button>
            } else {
                return (
                    <div className='position-relative'>
                        <button className='button-orange ticket-control-button-for-control' onClick={() => { setShowControlButton(!showControlButton) }}>Ch???t ?????i so??t</button>
                        <DropdownControl
                            showControl={showControlButton}
                            arrForControl={arrFilterFamily}
                            packageTicket="ticketFamily"
                        />
                    </div>
                )
            }
        }
    }

    return (
        <div id="ticket-control">
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8 ticket-control-left'>
                        <div className='ticket-control-left-content outlet mr-0'>
                            <div className='outlet-content'>
                                <h2 className='outlet-title'>?????i so??t v??</h2>
                                <div className='d-flex'>
                                    {renderButtonPackage()}
                                </div>
                                <div className='ticket-control-form'>
                                    <FormSearch />
                                    <div className='ticket-control-button'>
                                        {renderButtonForControl()}
                                    </div>
                                </div>
                                {renderTableTicketControl()}
                            </div>
                        </div>
                    </div>
                    <div className='col-4 ticket-control-right'>
                        <div className='outlet ticket-control-right-content'>
                            <div className='outlet-content'>
                                <h4 className='ticket-control-filter-title'>L???c v??</h4>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>T??nh tr???ng ?????i so??t</p>
                                        </div>
                                        <div className='col-6'>
                                            <Radio.Group onChange={formik.handleChange} name="tinhTrangDoiSoatRadio" value={formik.values.tinhTrangDoiSoatRadio}>
                                                <Radio value="T???t c???">T???t c???</Radio>
                                                <Radio value="???? ?????i so??t">???? ?????i so??t</Radio>
                                                <Radio value="Ch??a ?????i so??t">Ch??a ?????i so??t</Radio>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>Lo???i v??</p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-gate-ticket'>V?? c???ng</p>
                                        </div>
                                    </div>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>T??? ng??y</p>
                                        </div>
                                        <div className='col-6'>
                                            <DatePickerCom onChangeDatePicker={onChangeDatePickerStart} name={"ticketControlPickerStart"} popupName={"picker-ticket-filter-start"} format={"DD/MM/YYYY"} value={null} />
                                        </div>
                                    </div>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>?????n ng??y</p>
                                        </div>
                                        <div className='col-6'>
                                            <DatePickerCom onChangeDatePicker={onChangeDatePickerEnd} name={"ticketControlPickerEnd"} popupName={"picker-ticket-filter-end"} format={"DD/MM/YYYY"} value={null} />
                                        </div>
                                    </div>
                                    <div className='text-center ticket-control-filter-button'>
                                        <button type='submit' className='button-ouline-orange'>L???c</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
