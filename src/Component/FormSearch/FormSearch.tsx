import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export default function FormSearch() {
    return (
        <form>
            <Input className='input-search' style={{ height: "48px", width: "446px", borderColor: "transparent" }} suffix={<SearchOutlined />} placeholder="Search" />
        </form>
    )
}
