import { LogoutOutlined, ShoppingCartOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

export default function ListMenu({ onClose }) {
    const navigation = useNavigate();
    const HandleClick = (value) => {
        if (onClose !== undefined) {
            onClose();
        }
        navigation(`${value.key}`);
    }

    const HandleLogout = (value) => {
        if (value.key === 'logout') {
            navigation(`/Admin/Login`);
        }
    }
    return (
        <div className='d-flex flex-column justify-content-between h-100'>
            <Menu
                onClick={HandleClick}
                className="fw-bold"
                items={[{
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-border-all" viewBox="0 0 16 16">
                        <path d="M0 0h16v16H0zm1 1v6.5h6.5V1zm7.5 0v6.5H15V1zM15 8.5H8.5V15H15zM7.5 15V8.5H1V15z" />
                    </svg>
                    ,
                    label: 'Dashboard',
                    key: "Dashboard"
                }, {
                    icon: <img width="20" height="20" src="https://img.icons8.com/pastel-glyph/20/clothes--v2.png" alt="clothes--v2" />,
                    className: "mt-4",
                    label: "Cloth",
                    key: "cloth"
                }, {
                    icon: <UserOutlined style={{ fontSize: 20 }} />,
                    label: "User",
                    className: "mt-4",
                    key: "user"
                }, {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    </svg>
                    ,
                    className: "mt-4",
                    label: "Model",
                    key: "model"
                }, {
                    icon: <ShoppingCartOutlined style={{ fontSize: 20 }} />
                    ,
                    className: "mt-4",
                    label: "Order",
                    key: "order"
                }, {
                    icon: <TagOutlined style={{ fontSize: 20 }} />
                    // <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 576 512"><path d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z" /></svg>
                    ,
                    className: "mt-4",
                    label: "Category",
                    key: "category"
                }, {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 576 512"><path d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z" /></svg>
                    ,
                    className: "mt-4",
                    label: "Province",
                    key: "province"
                }
                    // , {
                    // icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    //     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    //     <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    // </svg>,
                    // className: "mt-4",
                    // label: "Profile",
                    // key: "profile"
                    // }
                ]} />
            < Menu
                onClick={HandleLogout}
                className="fw-bold"
                items={
                    [{
                        icon: <LogoutOutlined style={{ fontSize: 20 }} />,
                        label: "Logout",
                        key: "logout"
                    }]} />
        </div >
    )
}
