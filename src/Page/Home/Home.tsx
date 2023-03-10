import React from 'react'
import "./Home.scss";
import ChartDay from './Chart/ChartDay';
import PieFamily from './Pie/PieFamily';
import PieEvent from './Pie/PieEvent';
import DatePickerCom from '../../Component/DatePicker/DatePickerCom';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import {setValueCalendarReducer} from '../../Redux/Reducers/CalendarReducer/CalendarReducer'
import ChartWeek from './Chart/ChartWeek';
import type { DatePickerProps } from 'antd';

export default function Home() {

    let today = dayjs()

    const dispatch = useAppDispatch()

    const { radioValue } = useAppSelector(state => state.HomeReducer)

    const renderChart = () => {
        if (radioValue) {
            return <ChartDay />
        } else {
            return <ChartWeek />
        }
    }

    const onChangeDatePickerHome: DatePickerProps['onChange'] = (date, dateString) => {
        dispatch(setValueCalendarReducer(dayjs(date).format("YYYY-MM-DD")))
    };

    return (
        <div className='outlet' id="home">
            <div className='outlet-content home-content'>
                <h2 className='outlet-title'>Thống kê</h2>
                <div className='d-flex justify-content-between'>
                    <h4 className='home-chart-title'>Doanh thu</h4>
                    <DatePickerCom onChangeDatePicker={onChangeDatePickerHome} name={"picker-home1"} popupName={"picker1"} value={today} format={"MMMM, YYYY"} />
                </div>
                <div className='home-chart'>
                    {renderChart()}
                </div>
                <div className='home-revenue'>
                    <p className='home-weekly-revenue'>Tổng doanh thu theo tuần</p>
                    <p className='home-num-revenue'><span>525.145.000</span> đồng</p>
                </div>
                <div className='home-pie'>
                    <DatePickerCom onChangeDatePicker={onChangeDatePickerHome} name={"picker-home2"} popupName={"picker2"} value={today} format={"MMMM, YYYY"} />
                    <PieFamily />
                    <PieEvent />
                    <div className='home-pie-note'>
                        <div>
                            <div className='home-pie-note-top'></div>
                            <div className='d-flex home-pie-used'>
                                <div className='home-pie-color'></div>
                                <p className='home-pie-text'>Vé đã sử dụng</p>
                            </div>
                            <div className='d-flex home-pie-not-used'>
                                <div className='home-pie-color'></div>
                                <p className='home-pie-text'>Vé chưa sử dụng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
