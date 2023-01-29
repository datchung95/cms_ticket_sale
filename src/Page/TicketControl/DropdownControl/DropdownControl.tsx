import React, { useState } from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../Redux/hook';
import { updateForControlDocumentAction } from '../../../Redux/Actions/UpdateData/UpdateDataAction';
import { getAllDataTicketEventControlReducer, getAllDataTicketFamilyControlReducer } from '../../../Redux/Reducers/TicketControlReducer/TicketControlReducer';

interface DataTicketControl {
    congCheckIn: string;
    doiSoat: boolean;
    ngaySuDung: string;
    ngayXuatVe: string;
    soVe: string;
    tinhTrangSuDung: string;
    tenSuKien: string;
    id: string;
    tenLoaiVe: string;
}

interface ShowControl {
    showControl: boolean;
    packageTicket: string;
    arrForControl: DataTicketControl[];
}

interface DataType {
    soVe: string;
    tenLoaiVe: string
}

export default function DropdownControl(props: ShowControl) {

    const dispatch = useAppDispatch()

    const [page, setPage] = useState(1);

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
                return <p>{(page - 1) * 10 + index + 1}</p>
            },
        },
        {
            title: 'Số vé',
            dataIndex: 'soVe',
        },
        {
            title: 'Loại vé',
            dataIndex: 'tenLoaiVe'
        },
        {
            render: (text, record, index) => {
                if (text.doiSoat) {
                    return <div style={{ fontStyle: "italic", color: "#A5A8B1", fontSize: "14px", fontWeight: "500", lineHeight: "22px" }}>Đã đối soát</div>
                } else {
                    return <div style={{ fontStyle: "italic", color: "#FD5959", fontSize: "14px", fontWeight: "500", lineHeight: "22px" }}>Chưa đối soát</div>
                }
            }
        },
        {
            render: (text, record, index) => {
                if (props.packageTicket === "ticketFamily") {
                    return <button className='button-orange' onClick={() => {
                        dispatch(updateForControlDocumentAction("ticketFamily", text.id, true, getAllDataTicketFamilyControlReducer))
                    }}>Chốt</button>
                } else {
                    return <button className='button-orange' onClick={() => {
                        dispatch(updateForControlDocumentAction("ticketEvent", text.id, true, getAllDataTicketEventControlReducer))
                    }}>Chốt</button>
                }
            }
        }
    ];

    return (
        <div className={`dropdown-menu ticket-control-dropdown ${props.showControl ? "show" : ""}`}>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={props.arrForControl}
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
