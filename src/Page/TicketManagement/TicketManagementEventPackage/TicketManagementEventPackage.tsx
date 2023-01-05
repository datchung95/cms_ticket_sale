import React, { useState } from 'react'
import { Table } from 'antd';
import { useAppDispatch } from '../../../Redux/hook';
import { CaretLeftOutlined, CaretRightOutlined, MoreOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ModalChangeDate from '../ModalChangeDate/ModalChangeDate';
import { openModalReducer } from '../../../Redux/Reducers/TicketManagementReducer/TicketManagementReducer';

interface DataType {
    bookingCode: string;
    soVe: string;
    tenSuKien: string;
    tinhTrangSuDung: string;
    ngaySuDung: string;
    ngayXuatVe: string;
    cong: string;
}

const data: DataType[] = [
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Đã sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Chưa sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Hết hạn",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Chưa sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Đã sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },

    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Hết hạn",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Hết hạn",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Chưa sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },

    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Đã sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Đã sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Đã sử dụng",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
    {
        bookingCode: 'ALT20210501',
        soVe: "123456789034",
        tenSuKien: 'Hội trợ triển lãm tiêu dùng',
        tinhTrangSuDung: "Hết hạn",
        ngaySuDung: "14/4/2021",
        ngayXuatVe: "14/4/2021",
        cong: "Cổng 1"
    },
];

export default function TicketManagementEventPackage() {

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
            title: 'Booking Code',
            dataIndex: 'bookingCode'
        },
        {
            title: 'Số vé',
            dataIndex: 'soVe',
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'tenSuKien',
            width: 220.28
        },
        {
            title: 'Tình trạng sử dụng',
            dataIndex: 'tinhTrangSuDung',
            render: (text, record, index) => {
                if (text === "Chưa sử dụng") {
                    return <div className='button-outline-green' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../../Assets/ButtonIcon/Ellipse Green.png")} alt="buttongreen" />
                        {text}
                    </div>
                } else if (text === "Đã sử dụng") {
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
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung'
        },
        {
            title: 'Ngày xuất vé',
            dataIndex: 'ngayXuatVe',
        },
        {
            title: 'Cổng check-in',
            dataIndex: 'cong',
        },
        {
            render: (text, record, index) => {
                if (text.tinhTrangSuDung === "Chưa sử dụng") {
                    return <div>
                        <div style={{ cursor: "pointer" }} onClick={() => {
                            dispatch(openModalReducer({
                                openModal: true,
                                soVe: text.soVe,
                                tenSuKien: text.tenSuKien,
                                checkIn: text.cong
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
                columns={columns}
                dataSource={data}
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
