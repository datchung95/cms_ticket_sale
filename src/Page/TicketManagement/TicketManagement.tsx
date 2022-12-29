import { Input } from 'antd'
import React from 'react'
import { SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import "./TicketManagement.scss"
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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

export default function TicketManagement() {

    const itemRender = (_: any, type: any, originalElement: any) => {
        if (type === "prev") {
            return <CaretLeftOutlined style={{ color: "#A5A8B1" }} />;
        }
        if (type === "next") {
            return <CaretRightOutlined style={{ color: "#FF993C" }} />;
        }
        return originalElement;
    };

    const [page, setPage] = React.useState(1);

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
        },
        {
            title: 'Tình trạng sử dụng',
            dataIndex: 'tinhTrangSuDung',
            render: (text, record, index) => {
                if (text === "Chưa sử dụng") {
                    return <div className='button-outline-green' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../Assets/ButtonIcon/Ellipse Green.png")} alt="buttongreen" />
                        {text}
                    </div>
                } else if (text === "Đã sử dụng") {
                    return <div className='button-outline-gray' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../Assets/ButtonIcon/Ellipse Gray.png")} alt="buttongray" />
                        {text}
                    </div>
                } else {
                    return <div className='button-outline-red' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../Assets/ButtonIcon/Ellipse Red.png")} alt="buttonred" />
                        {text}
                    </div>
                }
            },
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung',
            render: (text, record, index) => {
                return <div>{text}</div>
            },
        },
        {
            title: 'Ngày xuất vé',
            dataIndex: 'ngayXuatVe',
        },
        {
            title: 'Cổng check-in',
            dataIndex: 'cong',
        },
    ];

    return (
        <div className='outlet' id="ticket-management">
            <div className='outlet-content ticket-management-top'>
                <h2 className='outlet-title'>Danh sách vé</h2>
                <div className='ticket-management-form'>
                    <form>
                        <Input className='input-search' style={{ height: "48px", width: "446px" }} suffix={<SearchOutlined />} placeholder="Search" />
                    </form>
                    <div>
                        <button className='button-ouline-orange button-filter'>
                            <img src={require("../../Assets/ButtonIcon/filter.png")} alt="buttonfilter" />
                            Lọc vé
                        </button>
                        <button className='button-ouline-orange'>
                            Xuất file (.csv)
                        </button>
                    </div>
                </div>
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
        </div>
    )
}
