import React from 'react'
import { Input, MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import "./DashboardTemplate.scss"
import { SearchOutlined } from '@ant-design/icons';

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
        } to="/setting">{location.pathname === "/setting" || location.pathname === "/setting/addticketpackage" || location.pathname === "/setting/updateticketpackage" ? <img style={{ marginRight: "21px", width: "20px", height: "20px" }} src={require("../../Assets/TemplateIcon/Setting1.png")} alt="logo" /> : <img style={{ marginRight: "21px", width: "20px", height: "20px" }} src={require("../../Assets/TemplateIcon/Setting.png")} alt="logo" />} Cài đặt</NavLink>, '/system', null, [
            getItem(<NavLink style={({ isActive }) =>
                isActive ? { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "700" } : { color: "#1E0D03", backgroundColor: "transparent", fontSize: "18px", fontWeight: "500" }
            } to="/setting">Gói dịch vụ</NavLink>, '/system/positionmanagement')
        ], "group")
    ];

    return (
        <Layout style={{ minHeight: '100vh' }} id="dashboard-template">
            <Sider className='dashboard-template-sider'>
                <div className='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <div className="dashboard-template-logo">
                            <img src={require("../../Assets/Logo/insight-05 1.png")} alt="logo" />
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
                    </div>
                    <div className='text-center dashboard-template-bottom'>
                        <p className='m-0 dashboard-template-copyright'>Copyright &copy; 2020 Alta Software</p>
                    </div>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Content>
                    <div className='d-flex justify-content-between dashboard-template-content'>
                        <form>
                            {location.pathname === "/setting" || location.pathname === "/setting/addticketpackage" || location.pathname === "/setting/updateticketpackage" ? "" : <Input className='input-search' style={{ height: "48px", width: "446px", borderColor: "transparent" }} suffix={<SearchOutlined />} placeholder="Search" />}
                        </form>
                        <div className='dashboard-template-img'>
                            <img style={{ width: "24px", height: "24px" }} src={require("../../Assets/TemplateIcon/fi_mail.png")} alt="mail" />
                            <img style={{ width: "24px", height: "24px" }} src={require("../../Assets/TemplateIcon/fi_bell.png")} alt="bell" />
                            <img style={{ width: "48px", height: "48px" }} src={require("../../Assets/TemplateIcon/Avatar.png")} alt="avatar" />
                        </div>
                    </div>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

