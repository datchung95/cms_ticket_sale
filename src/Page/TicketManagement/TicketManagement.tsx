import React, { useEffect, useState } from 'react'
import "./TicketManagement.scss"
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { changeTicketManagementPackageReducer } from '../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import DropdownTicketFilter from './DropdownTicketFilter/DropdownTicketFilter';
import TicketManagementEventPackage from './TicketManagementEventPackage/TicketManagementEventPackage';
import TicketManagementFamilyPackage from './TicketManagementFamilyPackage/TicketManagementFamilyPackage';
import FormSearch from '../../Component/FormSearch/FormSearch';
import { getAllDataAction } from '../../Redux/Actions/GetAllData/GetAllDataAction';
import { PACKAGE } from '../../Const/Const';
import { getAllDataTicketPackageReducer } from '../../Redux/Reducers/TicketPackageReducer/TicketPackageReducer';

export default function TicketManagement() {

    const dispatch = useAppDispatch()

    const { changePackage } = useAppSelector(state => state.TicketManagementReducer);

    const { arrPackageUsed } = useAppSelector(state => state.TicketPackageReducer)

    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatch(getAllDataAction(PACKAGE, getAllDataTicketPackageReducer))
    }, [])

    useEffect(() => {
        dispatch(changeTicketManagementPackageReducer(arrPackageUsed[0].tenGoi))
    }, [arrPackageUsed])

    const renderTicketManagementPackage = () => {
        if (changePackage === "Gói sự kiện") {
            return <TicketManagementEventPackage />
        } else {
            return <TicketManagementFamilyPackage />
        }
    }

    // const renderButtonPackage = () => {
    //     let indexFamily = arrPackageUsed.findIndex(item => item.tenGoi === "Gói gia đình")
    //     let indexEvent = arrPackageUsed.findIndex(item => item.tenGoi === "Gói sự kiện")
    //     if (indexFamily !== -1 && indexEvent !== -1) {
    //         return <div className='d-flex'>
    //             <p onClick={() => { dispatch(changeTicketManagementPackageReducer(false)) }} className={`${changePackage === false ? "button-package-active" : ""} button-package`}>Gói gia đình</p>
    //             <p onClick={() => { dispatch(changeTicketManagementPackageReducer(true)) }} className={`${changePackage === true ? "button-package-active" : ""} button-package`}>Gói sự kiện</p>
    //         </div>
    //     } else if (indexFamily !== -1 && indexEvent === -1) {
    //         dispatch(changeTicketManagementPackageReducer(false))
    //         return <></>
    //     } else if (indexEvent !== -1 && indexFamily === -1) {
    //         dispatch(changeTicketManagementPackageReducer(true))
    //         return <></>
    //     } else {
    //         return <></>
    //     }
    // }

    const renderButtonPackage = () => {
        if (arrPackageUsed.length > 1) {
            return arrPackageUsed.map((item, index) => {
                return <p key={index} onClick={() => { dispatch(changeTicketManagementPackageReducer(item.tenGoi)) }} className={`${changePackage === item.tenGoi ? "button-package-active" : ""} button-package`}>{item.tenGoi}</p>
            })
        } else {
            return <></>
        }
    }

    return (
        <div className='outlet' id="ticket-management">
            <div className='outlet-content ticket-management-top'>
                <h2 className='outlet-title'>Danh sách vé</h2>
                <div className='d-flex'>
                    {renderButtonPackage()}
                </div>
                <div className='ticket-management-form'>
                    <FormSearch />
                    <div className='ticket-management-button'>
                        <div className='d-inline ticket-management-dropdown'>
                            <button className='button-ouline-orange button-filter' onClick={() => { setShow(!show) }}>
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
