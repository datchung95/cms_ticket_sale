import React, { useEffect } from 'react'
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import "./DashboardTemplate.scss"

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem;
}

export default function DashboardTemplate() {

    const location = useLocation();

    const items: MenuItem[] = [
        getItem(<NavLink style={({ isActive }) =>
            isActive ? { color: "white", backgroundColor: "#FFB800", fontSize: "18px", fontWeight: "700" } : { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "500" }
        } to="/">{location.pathname === "/" ? <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../Assets/TemplateIcon/Home1.png")} alt="logo" /> : <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../Assets/TemplateIcon/Home.png")} alt="logo" />} Trang chủ</NavLink>, '/'),
    
        getItem(<NavLink style={({ isActive }) =>
            isActive ? { color: "white", backgroundColor: "#FFB800", fontSize: "18px", fontWeight: "700" } : { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "500" }
        } to="/ticketmanagement">{location.pathname === "/ticketmanagement" ? <img style={{ marginRight: "15px", width: "20px", height: "14px" }} src={require("../../Assets/TemplateIcon/Ticket1.png")} alt="logo" /> : <img style={{ marginRight: "15px", width: "20px", height: "14px" }} src={require("../../Assets/TemplateIcon/Ticket.png")} alt="logo" />} Quản lý vé</NavLink>, '/device'),
    
        getItem(<NavLink style={({ isActive }) =>
            isActive ? { color: "white", backgroundColor: "#FFB800", fontSize: "18px", fontWeight: "700" } : { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "500" }
        } to="/ticketcontrol">{location.pathname === "/ticketcontrol" ? <img style={{ marginRight: "15px", width: "20px", height: "20px" }} src={require("../../Assets/TemplateIcon/Invoice1.png")} alt="logo" /> : <img style={{ marginRight: "15px", width: "20px", height: "20px" }} src={require("../../Assets/TemplateIcon/Invoice.png")} alt="logo" />} Đối soát vé</NavLink>, '/service'),
    
        getItem(<NavLink style={({ isActive }) =>
            isActive ? { color: "white", backgroundColor: "#FFB800", fontSize: "18px", fontWeight: "700" } : { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "500" }
        } to="/setting">{location.pathname === "/setting" ? <img style={{ marginRight: "21px", width: "20px", height: "20px" }} src={require("../../Assets/TemplateIcon/Setting1.png")} alt="logo" /> : <img style={{ marginRight: "21px", width: "20px", height: "20px" }} src={require("../../Assets/TemplateIcon/Setting.png")} alt="logo" />} Cài đặt</NavLink>, '/system', null, [
            getItem(<NavLink style={({ isActive }) =>
                isActive ? { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "700" } : { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "500" }
            } to="/setting">Gói dịch vụ</NavLink>, '/system/positionmanagement')
        ], "group")
    ];

    return (
        <Layout style={{ minHeight: '100vh' }} id="dashboard-template">
            <Sider className='dashboard-template-sider'>
                <div className="dashboard-template-logo">
                    <img src={require("../../Assets/Logo/insight-05 1.png")} alt="logo" />
                </div>
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Content >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

