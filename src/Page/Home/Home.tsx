import React from 'react'
import "./Home.scss";
import ChartDay from './Chart/ChartDay';
import PieFamily from './Pie/PieFamily';
import PieEvent from './Pie/PieEvent';

export default function Home() {



    return (
        <div className='outlet' id="home">
            <div className='outlet-content home-content'>
                <h2 className='outlet-title'>Thống kê</h2>
                <div>
                    <h4 className='home-chart-title'>Doanh thu</h4>
                </div>
                <div className='home-chart'>
                    <ChartDay />
                </div>
                <div className='home-revenue'>
                    <p className='home-weekly-revenue'>Tổng doanh thu theo tuần</p>
                    <p className='home-num-revenue'><span>525.145.000</span> đồng</p>
                </div>
                <div className='home-pie'>
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
