import React from 'react'
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { getAllDataTicketEventManagementReducer, getAllDataTicketFamilyManagementReducer, openModalReducer } from '../../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import DatePickerCom from '../../../Component/DatePicker/DatePickerCom';
import type { DatePickerProps } from 'antd';
import "./ModalChangeDate.scss"
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { updateDateDocumentAction } from '../../../Redux/Actions/UpdateData/UpdateDataAction';
import { TICKETEVENT, TICKETFAMILY } from '../../../Const/Const';

export default function ModalChangeDate() {

    const { modalChangeValue } = useAppSelector(state => state.TicketManagementReducer);

    const dispatch = useAppDispatch();
    
    const formik = useFormik({
        initialValues: {
            modalChangeDatePickerFamily: "",
            modalChangeDatePickerEvent: "",
            ticket: ""
        },
        onSubmit: async (value) => {
            formik.values.ticket = modalChangeValue.id
            if (formik.values.modalChangeDatePickerFamily !== "") {  
                await dispatch(updateDateDocumentAction(TICKETFAMILY, formik.values.ticket, formik.values.modalChangeDatePickerFamily, getAllDataTicketFamilyManagementReducer))
                dispatch(openModalReducer({
                    openModal: false,
                    id: "",
                    soVe: "",
                    tenSuKien: "",
                    checkIn: ""
                }))
            }

            if (formik.values.modalChangeDatePickerEvent !== "") {
                await dispatch(updateDateDocumentAction(TICKETEVENT, formik.values.ticket, formik.values.modalChangeDatePickerEvent, getAllDataTicketEventManagementReducer))
                dispatch(openModalReducer({
                    openModal: false,
                    id: "",
                    soVe: "",
                    tenSuKien: "",
                    checkIn: ""
                }))
            }

        }
    })

    const handleCancel = () => {
        dispatch(openModalReducer(false))
    };

    const onChangeDatePickerFamily: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString !== "") {
            formik.setFieldValue("modalChangeDatePickerFamily", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("modalChangeDatePickerFamily", "")
        }
    };

    const onChangeDatePickerEvent: DatePickerProps['onChange'] = (date, dateString) => {     
        if (dateString !== "") {
            formik.setFieldValue("modalChangeDatePickerEvent", dayjs(date).format("DD/MM/YYYY"))
        } else {
            formik.setFieldValue("modalChangeDatePickerEvent", "")
        }
    };

    return (
        <Modal className='ticket-management-modal' title="?????i ng??y s??? d???ng v??"
            closable={false}
            open={modalChangeValue.openModal}
            onCancel={handleCancel}
        >
            <form onSubmit={formik.handleSubmit}>
                {modalChangeValue.tenSuKien === ""

                    ?

                    <div className='container-fluid' key="1">
                        <div className='row'>
                            <p className='col-4 modal-content-left'>S??? v??</p>
                            <p className='col-8 modal-content-right'>{modalChangeValue.soVe}</p>
                        </div>
                        <div className='row'>
                            <p className='col-4 modal-content-left'>C???ng check-in</p>
                            <p className='col-8 modal-content-right'>{modalChangeValue.checkIn}</p>
                        </div>
                        <div className='row align-items-center'>
                            <p className='col-4 modal-content-left m-0'>H???n s??? d???ng</p>
                            <div className='col-8 m-0'>
                                <DatePickerCom onChangeDatePicker={onChangeDatePickerFamily} name={"modalChangeDatePickerFamily"} popupName='modal-change-date-picker1' format='DD/MM/YYYY' value={null} />
                            </div>
                        </div>
                    </div>

                    :

                    <div className='container-fluid' key="2">
                        <div className='row'>
                            <p className='col-4 modal-content-left'>S??? v??</p>
                            <p className='col-8 modal-content-right'>{modalChangeValue.soVe}</p>
                        </div>
                        <div className='row'>
                            <p className='col-4 modal-content-left'>C???ng check-in</p>
                            <p className='col-8 modal-content-right'>{modalChangeValue.checkIn}</p>
                        </div>
                        <div className='row'>
                            <p className='col-4 modal-content-left'>T??n s??? ki???n</p>
                            <p className='col-8 modal-content-right'>{modalChangeValue.tenSuKien}</p>
                        </div>
                        <div className='row align-items-center'>
                            <p className='col-4 modal-content-left m-0'>H???n s??? d???ng</p>
                            <div className='col-8 m-0'>
                                <DatePickerCom onChangeDatePicker={onChangeDatePickerEvent} name={"modalChangeDatePickerEvent"} popupName='modal-change-date-picker2' format='DD/MM/YYYY' value={null} />
                            </div>
                        </div>
                    </div>
                }
                <div className='ticket-management-modal-button'>
                    <button type='button' className='button-ouline-orange button-cancel' onClick={() => {
                        dispatch(openModalReducer({
                            openModal: false,
                            soVe: "",
                            tenSuKien: "",
                            checkIn: ""
                        }))
                    }}>H???y</button>
                    <button type='submit' className='button-orange button-save'>L??u</button>
                </div>
            </form>
        </Modal>
    )
}
