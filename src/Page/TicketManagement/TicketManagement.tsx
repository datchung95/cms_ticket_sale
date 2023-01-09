import React, { useState } from 'react'
import "./TicketManagement.scss"
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { changeTicketManagementPackageReducer } from '../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import DropdownTicketFilter from './DropdownTicketFilter/DropdownTicketFilter';
import TicketManagementEventPackage from './TicketManagementEventPackage/TicketManagementEventPackage';
import TicketManagementFamilyPackage from './TicketManagementFamilyPackage/TicketManagementFamilyPackage';
import FormSearch from '../../Component/FormSearch/FormSearch';

export default function TicketManagement() {

    const dispatch = useAppDispatch()

    const { changePackage } = useAppSelector(state => state.TicketManagementReducer);

    const [show, setShow] = useState(false)

    const renderTicketManagementPackage = () => {
        if (changePackage) {
            return <TicketManagementEventPackage />
        } else {
            return <TicketManagementFamilyPackage />
        }
    }

    return (
        <div className='outlet' id="ticket-management">
            <div className='outlet-content ticket-management-top'>
                <h2 className='outlet-title'>Danh sách vé</h2>
                <div className='d-flex'>
                    <p onClick={() => { dispatch(changeTicketManagementPackageReducer(false)) }} className={`${changePackage === false ? "button-package-active" : ""} button-package`}>Gói gia đình</p>
                    <p onClick={() => { dispatch(changeTicketManagementPackageReducer(true)) }} className={`${changePackage === true ? "button-package-active" : ""} button-package`}>Gói sự kiện</p>
                </div>
                <div className='ticket-management-form'>
                    <FormSearch />
                    <div className='ticket-management-button'>
                        <div className='d-inline ticket-management-dropdown'>
                            <button className='button-ouline-orange button-filter' onClick={() => {setShow(!show)}}>
                                <img src={require("../../Assets/ButtonIcon/filter.png")} alt="buttonfilter" />
                                Lọc vé
                            </button>
                            <DropdownTicketFilter show={show} />
                        </div>
                        <button className='button-ouline-orange'>
                            Xuất file (.csv)
                        </button>
                    </div>
                </div>
                {renderTicketManagementPackage()}
            </div>
        </div>
    )
}
