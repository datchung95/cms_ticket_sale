import React from 'react'
import { Area } from '@ant-design/plots';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../Redux/hook';

export default function ChartWeek() {

    const { valueCalendar } = useAppSelector(state => state.CalendarReducer);

    const selectWeek = ()  => {
        if (valueCalendar === "") {
            return 
        } else {
            return valueCalendar
        }
    }

    const data = [
        {
            label: `${dayjs(selectWeek()).subtract(49, "day").format("DD/MM")} - ${dayjs(selectWeek()).subtract(42, "day").format("DD/MM")}`,
            value: 142,
        },
        {
            label: "",
            value: 175,
        },
        {
            label: `${dayjs(selectWeek()).subtract(41, "day").format("DD/MM")} - ${dayjs(selectWeek()).subtract(40, "day").format("DD/MM")}`,
            value: 171,
        },
        {
            label: " ",
            value: 160,
        },
    
        {
            label: `${dayjs(selectWeek()).subtract(39, "day").format("DD/MM")} - ${dayjs(selectWeek()).subtract(32, "day").format("DD/MM")}`,
            value: 180,
        },
        {
            label: "  ",
            value: 190,
        },
        {
            label: `${dayjs(selectWeek()).subtract(31, "day").format("DD/MM")} - ${dayjs(selectWeek()).subtract(24, "day").format("DD/MM")}`,
            value: 230,
        },
        {
            label: "   ",
            value: 225,
        },
        {
            label: `${dayjs(selectWeek()).subtract(23, "day").format("DD/MM")} - ${dayjs(selectWeek()).subtract(16, "day").format("DD/MM")}`,
            value: 220,
        },
        {
            label: "    ",
            value: 255,
        },
        {
            label: `${dayjs(selectWeek()).subtract(15, "day").format("DD/MM")} - ${dayjs(selectWeek()).subtract(8, "day").format("DD/MM")}`,
            value: 220,
        },
        {
            label: "     ",
            value: 180,
        },
        {
            label: `${dayjs(selectWeek()).subtract(7, "day").format("DD/MM")} - ${dayjs(selectWeek()).format("DD/MM")}`,
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

    return (
        <>
            <Area {...config} />
        </>
    )
}
