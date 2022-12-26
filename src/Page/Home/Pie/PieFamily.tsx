import React from 'react'
import { Pie } from '@ant-design/plots';

const data = [
    {
        type: 'Vé chưa sử dụng',
        value: 13568,
    },
    {
        type: 'Vé đã sử dụng',
        value: 56024,
    }
];

const config = {
    appendPadding: 10,
    autoFit: false,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    width: 246,
    height: 246,
    color: ['#FF8A48', '#4F75FF'],
    statistic: {
        legend: false,
        content: {
            content: '',
        },
    },
    label: {
        type: 'inner',
        offset: '-0%',
        content: "",
        padding: 25,
        border: "1px solid black",
        backgroudColor: "white",
        style: {
            textAlign: 'center',
            fontSize: 14,
            fill: "#1E0D03",
        },
        autoRotate: false,
    },
    interactions: [
        {
            type: 'element-selected',
        },
        {
            type: 'element-active',
        },
    ],
}


export default function PieFamily() {
    return (
        <div>
            <h4 className='text-center m-0'>Gói gia đình</h4>
            <div className='pie-family'>
                <Pie {...config} legend={false} />
                <div className='pie-family-value1'>{data[0].value}</div>
                <div className='pie-family-value2'>{data[1].value}</div>
            </div>
        </div>
    )
}
