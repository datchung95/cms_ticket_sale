import React, { useEffect, useState } from 'react'
import { getAllDataAction } from '../../../Redux/Actions/GetAllData/GetAllDataAction';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { getAllDataTicketEventControlReducer } from '../../../Redux/Reducers/TicketControlReducer/TicketControlReducer';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TICKETEVENT } from '../../../Const/Const';

interface DataType {
    soVe: string;
    tenLoaiVe: string;
    ngaySuDung: string;
    congCheckIn: string;
    tenSuKien: string
}

export default function TicketEventControl() {

    const dispatch = useAppDispatch()

    const { arrDataTicketControlEvent } = useAppSelector(state => state.TicketControlReducer)

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllDataAction(TICKETEVENT, getAllDataTicketEventControlReducer));
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
            title: 'Số vé',
            dataIndex: 'soVe',
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'tenSuKien',
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung'
        },
        {
            title: 'Loại vé',
            dataIndex: 'tenLoaiVe'
        },
        {
            title: 'Cổng check-in',
            dataIndex: 'congCheckIn',
            render: (text, record, index) => {
                return <p className='mb-0'>Cổng {text}</p>
            }
        },
        {
            render: (text, record, index) => {
                if (text.doiSoat) {
                    return <div style={{ fontStyle: "italic", color: "#A5A8B1", fontSize: "14px", fontWeight: "500", lineHeight: "22px" }}>Đã đối soát</div>
                } else {
                    return <div style={{ fontStyle: "italic", color: "#FD5959", fontSize: "14px", fontWeight: "500", lineHeight: "22px" }}>Chưa đối soát</div>
                }
            }
        }
    ];

    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={arrDataTicketControlEvent}
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
