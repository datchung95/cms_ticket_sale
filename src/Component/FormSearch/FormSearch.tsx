import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../Redux/hook';
import { getAllDataTicketEventManagementReducer, getAllDataTicketFamilyManagementReducer, searchTicketManagementReducer } from '../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import { getAllDataAction } from '../../Redux/Actions/GetAllData/GetAllDataAction';
import { TICKETEVENT, TICKETFAMILY } from '../../Const/Const';
import { getAllDataTicketEventControlReducer, getAllDataTicketFamilyControlReducer, searchTicketControlReducer } from '../../Redux/Reducers/TicketControlReducer/TicketControlReducer';

export default function FormSearch() {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            search: ""
        },
        onSubmit: async (value) => {
            await dispatch(getAllDataAction(TICKETFAMILY, getAllDataTicketFamilyManagementReducer))
            await dispatch(getAllDataAction(TICKETEVENT, getAllDataTicketEventManagementReducer))
            await dispatch(getAllDataAction(TICKETFAMILY, getAllDataTicketFamilyControlReducer))
            await dispatch(getAllDataAction(TICKETEVENT, getAllDataTicketEventControlReducer))
            await dispatch(searchTicketManagementReducer(value))
            dispatch(searchTicketControlReducer(value))
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Input name="search" onChange={formik.handleChange} className='input-search' style={{ height: "48px", width: "446px", borderColor: "transparent" }} suffix={<SearchOutlined />} placeholder="Tìm bằng số vé" />
        </form>
    )
}
