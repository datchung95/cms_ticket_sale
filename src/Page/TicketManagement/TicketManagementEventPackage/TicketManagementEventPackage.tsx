import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { CaretLeftOutlined, CaretRightOutlined, MoreOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ModalChangeDate from '../ModalChangeDate/ModalChangeDate';
import { getAllDataTicketEventManagementReducer, openModalReducer } from '../../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';
import { getAllDataAction } from '../../../Redux/Actions/GetAllData/GetAllDataAction';
import { TICKETEVENT } from '../../../Const/Const';

interface DataType {
    id: string;
    soVe: string;
    tenSuKien: string;
    tinhTrangSuDung: string;
    ngaySuDung: string;
    ngayXuatVe: string;
    congCheckIn: string;
}

export default function TicketManagementEventPackage() {

    const dispatch = useAppDispatch();

    const { arrDataTicketManagementEvent } = useAppSelector(state => state.TicketManagementReducer);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllDataAction(TICKETEVENT, getAllDataTicketEventManagementReducer))
    }, [])

    const itemRender = (_: any, type: any, originalElement: any) => {
        if (type === "prev") {
            return <CaretLeftOutlined style={{ color: "#A5A8B1" }} />;
        }
        if (type === "next") {
            return <CaretRightOutlined style={{ color: "#FF993C" }} />;
        }
        return originalElement;
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return <div>{(page - 1) * 10 + index + 1}</div>
            },
        },
        {
            title: 'Booking Code',
            dataIndex: 'id',
            render: (text, record, index) => {
                return <p className='mb-0'>ALT{text.substr(0, 7).toUpperCase()}</p>
            }
        },
        {
            title: 'S??? v??',
            dataIndex: 'soVe',
        },
        {
            title: 'T??n s??? ki???n',
            dataIndex: 'tenSuKien',
            width: 200
        },
        {
            title: 'T??nh tr???ng s??? d???ng',
            dataIndex: 'tinhTrangSuDung',
            render: (text, record, index) => {
                if (text === "Ch??a s??? d???ng") {
                    return <div className='button-outline-green' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../../Assets/ButtonIcon/Ellipse Green.png")} alt="buttongreen" />
                        {text}
                    </div>
                } else if (text === "???? s??? d???ng") {
                    return <div className='button-outline-gray' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../../Assets/ButtonIcon/Ellipse Gray.png")} alt="buttongray" />
                        {text}
                    </div>
                } else {
                    return <div className='button-outline-red' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../../Assets/ButtonIcon/Ellipse Red.png")} alt="buttonred" />
                        {text}
                    </div>
                }
            },
        },
        {
            title: 'Ng??y s??? d???ng',
            dataIndex: 'ngaySuDung'
        },
        {
            title: 'Ng??y xu???t v??',
            dataIndex: 'ngayXuatVe',
        },
        {
            title: 'C???ng check-in',
            dataIndex: 'congCheckIn',
            render: (text, record, index) => {
                return <p className='mb-0'>C???ng {text}</p>
            }
        },
        {
            render: (text, record, index) => {
                if (text.tinhTrangSuDung === "Ch??a s??? d???ng") {
                    return <div>
                        <div style={{ cursor: "pointer" }} onClick={() => {
                            dispatch(openModalReducer({
                                openModal: true,
                                id: text.id,
                                soVe: text.soVe,
                                tenSuKien: text.tenSuKien,
                                checkIn: text.congCheckIn
                            }))
                        }}><MoreOutlined />
                        </div>

                    </div>
                }
            }
        }
    ];

    return (
        <div>
            <ModalChangeDate />
            <Table
                rowKey="id"
                columns={columns}
                dataSource={arrDataTicketManagementEvent}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-gray'}
                pagination={{
                    itemRender: itemRender,
                    onChange(current) {
                        setPage(current);
                    }
                }}
            />
        </div>
    )
}
