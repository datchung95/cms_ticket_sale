import React, { useState } from 'react'
import type { RadioChangeEvent } from 'antd';
import { DatePicker, Calendar, Button, Radio } from 'antd';
import dayjs from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"
import "./DatePickerCom.scss"
import { } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { setRadioValueReducer } from '../../Redux/Reducers/HomeReducer/HomeReducer';

interface porpTime {
    value: any,
    format: string,
    popupName: string,
    name: string,
    onChangeDatePicker: any
}

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    weekdays: [
        "T2", "T3", "T4", "T5", "T6", "T7", "CN"
    ],
    months: [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 5", "Tháng 7",
        "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ]
})

export default function DatePickerCom(props: porpTime) {

    let formatValue = dayjs(props.value).format(props.format);

    const [preNextMonth, setPreNextMonth] = useState(dayjs());

    const dispatch = useAppDispatch();

    const { radioValue } = useAppSelector(state => state.HomeReducer)

    const onChangeRadio = (e: RadioChangeEvent) => {
        dispatch(setRadioValueReducer(e.target.value))
    };

    return (
        <DatePicker
            name={props.name}
            popupClassName={props.popupName}
            onOpenChange={(open) => {
                if (open) {
                    const weekStart = dayjs().startOf('week').format("YYYY-MM-DD");
                    const picker = document.getElementsByClassName(props.popupName)
                    const pickerContainer = picker.item(0)?.getElementsByClassName("ant-picker-panel-container");
                    const pickerCalendar = pickerContainer?.item(0)?.getElementsByClassName("ant-picker-calendar")
                    const pickerPanel = pickerCalendar?.item(0)?.getElementsByClassName("ant-picker-panel");
                    const pickerBody = pickerPanel?.item(0)?.getElementsByClassName("ant-picker-body")
                    const antdPicker = pickerBody?.item(0)?.getElementsByClassName("ant-picker-content")
                    const tbodyWeek = antdPicker?.item(0)?.getElementsByTagName("tbody");

                    const trWeek = tbodyWeek?.item(0)?.getElementsByTagName("tr");

                    for (let i in trWeek) {
                        let tdWeek = trWeek?.item(parseInt(i))
                        let title: string = tdWeek?.getElementsByTagName("td").item(0)?.title as string
                        if (weekStart === title) {
                            tdWeek?.classList.add("week-current");
                        }
                    }
                }
            }}
            panelRender={(panelNode) =>
                radioValue === true ?
                    <Calendar
                        className='calendar-day'
                        fullscreen={false}
                        headerRender={({ value }) => {
                            value = preNextMonth
                            const year: number = value.year();

                            const monthName: string = dayjs(value).format("MMMM");
                            return (
                                <div className='date-header'>
                                    <div className='d-flex align-items-center date-header-top'>
                                        {<Button className='date-pre-button' type="link" onClick={() =>
                                            setPreNextMonth(preNextMonth.add(-1, 'months'))}>
                                            <img className='date-pre-icon' src={require("../../Assets/CalendarIcon/Previous.png")} alt="calendarpre" />
                                        </Button>}
                                        <p className='m-0 date-title-name'>
                                            <span>{monthName} </span>
                                            <span>{year}</span>
                                        </p>
                                        {<Button className='date-next-button' type="link" onClick={() => setPreNextMonth(preNextMonth.add(1, 'months'))}>
                                            <img className='date-next-icon' src={require("../../Assets/CalendarIcon/Next.png")} alt="calendarnext" />
                                        </Button>}
                                    </div>
                                    <Radio.Group className='date-header-bottom' onChange={onChangeRadio} value={radioValue}>
                                        <Radio value={true}>Theo ngày</Radio>
                                        <Radio value={false}>Theo tuần</Radio>
                                    </Radio.Group>
                                </div>
                            );
                        }}
                    /> :

                    <Calendar
                        className='calendar-month'
                        fullscreen={false}
                        headerRender={({ value }) => {
                            value = preNextMonth
                            const year: number = value.year();

                            const monthName: string = dayjs(value).format("MMMM");
                            return (
                                <div className='date-header'>
                                    <div className='d-flex align-items-center date-header-top'>
                                        {<Button className='date-pre-button' type="link" onClick={() =>
                                            setPreNextMonth(preNextMonth.add(-1, 'months'))}>
                                            <img className='date-pre-icon' src={require("../../Assets/CalendarIcon/Previous.png")} alt="calendarpre" />
                                        </Button>}
                                        <p className='m-0 date-title-name'>
                                            <span>{monthName} </span>
                                            <span>{year}</span>
                                        </p>
                                        {<Button className='date-next-button' type="link" onClick={() => setPreNextMonth(preNextMonth.add(1, 'months'))}>
                                            <img className='date-next-icon' src={require("../../Assets/CalendarIcon/Next.png")} alt="calendarnext" />
                                        </Button>}
                                    </div>
                                    <Radio.Group className='date-header-bottom' onChange={onChangeRadio} value={radioValue}>
                                        <Radio value={true}>Theo ngày</Radio>
                                        <Radio value={false}>Theo tuần</Radio>
                                    </Radio.Group>
                                </div>
                            );
                        }}
                    />}
            placeholder={`${props.value !== null ? formatValue : "dd/mm/yyyy"}`}
            format={props.format}
            style={{ width: "155px", height: "40px", border: "1px solid #A5A8B1" }}
            onChange={props.onChangeDatePicker}
            suffixIcon={<img style={{ width: "24px", height: "24px" }} src={require("../../Assets/CalendarIcon/fi_calendar.png")} alt="calendar" />} />
    )
}
