import React from 'react'
import { Area } from '@ant-design/plots';

const data = [
    {
        label: "Thứ 2",
        value: 142,
    },
    {
        label: "",
        value: 175,
    },
    {
        label: "Thứ 3",
        value: 171,
    },
    {
        label: " ",
        value: 160,
    },

    {
        label: "Thứ 4",
        value: 180,
    },
    {
        label: "  ",
        value: 190,
    },
    {
        label: "Thứ 5",
        value: 230,
    },
    {
        label: "   ",
        value: 225,
    },
    {
        label: "Thứ 6",
        value: 220,
    },
    {
        label: "    ",
        value: 255,
    },
    {
        label: "Thứ 7",
        value: 220,
    },
    {
        label: "     ",
        value: 180,
    },
    {
        label: "CN",
        value: 190,
    },

];
const config = {
    autoFit: true,
    height: 179,
    data,
    smooth: true,
    xField: 'label',
    yField: 'value',
    xAxis: {
        range: [0, 1],
    },
    yAxis: {
        min: 140,
        max: 260,
        tickCount: 4,
        label: {
            formatter: (text: string, item: any, index: number) => {
                switch (index) {
                    case 0:
                        return '140tr';
                    case 1:
                        return '180tr';
                    case 2:
                        return '220tr';
                    case 3:
                        return '260tr';
                }
            },
            offset: 39
        }
    },
    areaStyle: {
        fill: 'l(270) 0:#FFFFFF 1:#FAA05F',
        stroke: "#ECE9F1",
        strokeOpacity: 0.5,
    },
    line: {
        color: "#FF993C",
        size: 4
    }
};

export default function ChartDay() {
    return (
        <>
            <Area {...config} />
        </>
    )
}
