import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import FormSearch from '../../Component/FormSearch/FormSearch'
import './ListTicketPackage.scss'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { getAllDataAction } from '../../Redux/Actions/GetAllData/GetAllDataAction';
import { getAllDataTicketPackageReducer } from '../../Redux/Reducers/TicketPackageReducer/TicketPackageReducer';
import { ID_LOCAL, PACKAGE } from '../../Const/Const';

interface DataType {
    id: string;
    tenGoi: string;
    tinhTrang: string;
    tenSuKien: string;
}

export default function ListTicketPackage() {

    const dispatch = useAppDispatch();

    const { arrDataPackage } = useAppSelector(state => state.TicketPackageReducer);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllDataAction(PACKAGE, getAllDataTicketPackageReducer))
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
            title: 'Mã gói',
            dataIndex: 'id',
            render: (text, record, index) => {
                return <p className='mb-0'>ALT{text.substr(0, 7).toUpperCase()}</p>
            },
        },
        {
            title: 'Tên gói vé',
            dataIndex: 'tenGoi',
        },
        {
            title: 'Ngày áp dụng',
            render: (text, record, index) => {
                return <p className='mb-0'>{text.ngayApDungGoi} {text.gioApDungGoi}</p>
            },
            width: 150
        },
        {
            title: 'Ngày hết hạn',
            render: (text, record, index) => {
                return <p className='mb-0'>{text.ngayKetThucGoi} {text.gioKetThucGoi}</p>
            },
            width: 150
        },
        {
            title: 'Giá vé (VNĐ/Vé)',
            render: (text, record, index) => {
                return <p className='mb-0'>{(text.giaVe)?.toLocaleString()} VNĐ</p>
            },
            width: 100
        },
        {
            title: 'Giá combo (VNĐ/Combo)',
            render: (text, record, index) => {
                if (text.giaCombo !== 0) {
                    return <p className='mb-0'>{(text.giaCombo)?.toLocaleString()} VNĐ/{text.comboVe} vé</p>
                } else {
                    return <div>_</div>
                }
            },
            width: 100
        },
        {
            title: 'Tình trạng',
            dataIndex: 'tinhTrang',
            render: (text, record, index) => {
                if (text === "Đang áp dụng") {
                    return <div className='button-outline-green' style={{ display: "inline" }}>
                        <img style={{ marginRight: "8px" }} src={require("../../Assets/ButtonIcon/Ellipse Green.png")} alt="buttongreen" />
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
            render: (text, record, index) => {
                return <NavLink to={`/setting/updateticketpackage/${text.id}`} className='text-center d-block' onClick={() => {
                    localStorage.setItem(ID_LOCAL, text.id)
                }}>
                    <img src={require("../../Assets/ButtonIcon/fi_edit.png")} alt="update" /> 
                    <p className='mb-0' style={{ fontSize: "14px", fontWeight: "500", lineHeight: "22px", color: "#FF993C" }}>Cập nhật</p>
                </NavLink>
            },
            width: 100
        }
    ];

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
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={arrDataPackage}
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

