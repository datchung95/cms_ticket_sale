import React from 'react'
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { openModalReducer } from '../../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import DatePickerCom from '../../../Component/DatePicker/DatePickerCom';
import "./ModalChangeDate.scss"

export default function ModalChangeDate() {

    const { modalChangeValue } = useAppSelector(state => state.TicketManagementReducer);

    const dispatch = useAppDispatch();

    const handleOk = () => {

    };

    const handleCancel = () => {
        dispatch(openModalReducer(false))
    };

    return (
        <Modal className='ticket-management-modal' title="Đổi ngày sử dụng vé"
            closable={false}
            open={modalChangeValue.openModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <button className='button-ouline-orange button-cancel' onClick={() => {
                    dispatch(openModalReducer({
                        openModal: false,
                        soVe: "",
                        tenSuKien: "",
                        checkIn: ""
                    }))
                }}>Hủy</button>,
                <button className='button-orange button-save'>Lưu</button>
            ]}
        >
            {modalChangeValue.tenSuKien === ""

                ?

                <div className='container-fluid'>
                    <div className='row'>
                        <p className='col-4 modal-content-left'>Số vé</p>
                        <p className='col-8 modal-content-right'>{modalChangeValue.soVe}</p>
                    </div>
                    <div className='row'>
                        <p className='col-4 modal-content-left'>Cổng check-in</p>
                        <p className='col-8 modal-content-right'>{modalChangeValue.checkIn}</p>
                    </div>
                    <div className='row align-items-center'>
                        <p className='col-4 modal-content-left m-0'>Hạn sử dụng</p>
                        <p className='col-8 m-0'>
                            <DatePickerCom popupName='modal-change-date-picker1' format='DD/MM/YYYY' value={null} />
                        </p>
                    </div>
                </div>

                :

                <div className='container-fluid'>
                    <div className='row'>
                        <p className='col-4 modal-content-left'>Số vé</p>
                        <p className='col-8 modal-content-right'>{modalChangeValue.soVe}</p>
                    </div>
                    <div className='row'>
                        <p className='col-4 modal-content-left'>Cổng check-in</p>
                        <p className='col-8 modal-content-right'>{modalChangeValue.checkIn}</p>
                    </div>
                    <div className='row'>
                        <p className='col-4 modal-content-left'>Tên sự kiện</p>
                        <p className='col-8 modal-content-right'>{modalChangeValue.tenSuKien}</p>
                    </div>
                    <div className='row align-items-center'>
                        <p className='col-4 modal-content-left m-0'>Hạn sử dụng</p>
                        <p className='col-8 m-0'>
                            <DatePickerCom popupName='modal-change-date-picker1' format='DD/MM/YYYY' value={null} />
                        </p>
                    </div>
                </div>}
        </Modal>
    )
}
