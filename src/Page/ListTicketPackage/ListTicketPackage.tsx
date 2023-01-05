import React from 'react'
import { NavLink } from 'react-router-dom'
import FormSearch from '../../Component/FormSearch/FormSearch'
import './ListTicketPackage.scss'

export default function ListTicketPackage() {
    return (
        <div className='outlet' id="list-ticket-package">
            <div className='outlet-content list-ticket-package-top'>
                <h2 className='outlet-title'>Danh sách gói vé</h2>
                <div className='list-ticket-package-form'>
                    <FormSearch />
                    <div className='list-ticket-package-button'>
                        <button className='button-ouline-orange'>
                            Xuất file (.csv)
                        </button>
                        <NavLink to="/setting/addticketpackage" className='button-orange list-ticket-package-button-add'>
                            Thêm gói vé
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

