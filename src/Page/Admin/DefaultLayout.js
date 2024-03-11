import React, { useState } from 'react'
import '../../CSS/Admin.css';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ListMenu from '../../Component/Admin/Layout/ListMenu';
import { Outlet } from 'react-router';
import MenuDrawer from '../../Component/Admin/Drawer/MenuDrawer';

export default function DefaultLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [DrawerOpen, setDrawerOpen] = useState(false);
    return (
        <Layout className='M-Container'>
            <Layout.Header className='M-Header'>
                <div className='M-Logo-Container'>
                    <LazyLoadImage src='../../Images/Logo.png' className='M-Logo' />
                </div>
                <div className='M-Mobile-Drawer-Icon'>
                    <MenuOutlined className='M-Icon d-none d-md-block' onClick={() => setCollapsed(!collapsed)} />
                    <MenuOutlined className='M-Icon d-block d-md-none' onClick={() => { setDrawerOpen(true) }} />
                </div>
            </Layout.Header>
            <Layout>
                <Layout.Sider className='bg-tranparent d-none d-md-block' collapsed={collapsed} collapsible trigger={null} theme='light'>
                    <ListMenu />
                </Layout.Sider>
                <Layout className='m-3 m-0 m-md-5 mt-md-4'>
                    <Layout.Content className='M-Content'>
                        <Outlet />
                    </Layout.Content>
                    <Layout.Footer className='M-Footer'>
                        Footer
                    </Layout.Footer>
                </Layout>
            </Layout>
            <MenuDrawer onClose={() => setDrawerOpen(false)} show={DrawerOpen} />
        </Layout>
    )
}
