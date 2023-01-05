import { Radio } from 'antd';
import { useFormik } from 'formik';
import React from 'react'
import DatePickerCom from '../../Component/DatePicker/DatePickerCom';
import FormSearch from '../../Component/FormSearch/FormSearch';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { changeTicketManagementPackageReducer } from '../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import "./TicketControl.scss"

export default function TicketControl() {

    const dispatch = useAppDispatch()

    const { changePackage } = useAppSelector(state => state.TicketManagementReducer);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tinhTrangDoiSoatRadio: "Tất cả"
        },
        onSubmit: (value) => {
            console.log(value)
        }
    })

    return (
        <div id="ticket-control">
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8 ticket-control-left'>
                        <div className='ticket-control-left-content outlet mr-0'>
                            <div className='outlet-content'>
                                <h2 className='outlet-title'>Đối soát vé</h2>
                                <div className='d-flex'>
                                    <p onClick={() => { dispatch(changeTicketManagementPackageReducer(false)) }} className={`${changePackage === false ? "button-package-active" : ""} button-package`}>Gói gia đình</p>
                                    <p onClick={() => { dispatch(changeTicketManagementPackageReducer(true)) }} className={`${changePackage === true ? "button-package-active" : ""} button-package`}>Gói sự kiện</p>
                                </div>
                                <div className='ticket-control-form'>
                                    <FormSearch />
                                    <div className='ticket-control-button'>
                                        {formik.values.tinhTrangDoiSoatRadio === "Chưa đối soát" ? <button className='button-orange'>Chốt đối soát</button> : <button className='button-ouline-orange'>
                                            Xuất file (.csv)
                                        </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 ticket-control-right'>
                        <div className='outlet ticket-control-right-content'>
                            <div className='outlet-content'>
                                <h4 className='ticket-control-filter-title'>Lọc vé</h4>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>Tình trạng đối soát</p>
                                        </div>
                                        <div className='col-6'>
                                            <Radio.Group onChange={formik.handleChange} name="tinhTrangDoiSoatRadio" value={formik.values.tinhTrangDoiSoatRadio}>
                                                <Radio value="Tất cả">Tất cả</Radio>
                                                <Radio value="Đã đối soát">Đã đối soát</Radio>
                                                <Radio value="Chưa đối soát">Chưa đối soát</Radio>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>Loại vé</p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-gate-ticket'>Vé cổng</p>
                                        </div>
                                    </div>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>Từ ngày</p>
                                        </div>
                                        <div className='col-6'>
                                            <DatePickerCom popupName={"picker-ticket-filter-start"} format={"DD/MM/YYYY"} value={null} />
                                        </div>
                                    </div>
                                    <div className='row ticket-control-filter-form'>
                                        <div className='col-6'>
                                            <p className='ticket-control-filter-text'>Đến ngày</p>
                                        </div>
                                        <div className='col-6'>
                                            <DatePickerCom popupName={"picker-ticket-filter-end"} format={"DD/MM/YYYY"} value={null} />
                                        </div>
                                    </div>
                                    <div className='text-center ticket-control-filter-button'>
                                        <button type='submit' className='button-ouline-orange'>Lọc</button>
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
