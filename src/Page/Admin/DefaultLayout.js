import React, { useState } from 'react'
import '../../CSS/Admin.css';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ListMenu from '../../Component/Admin/Layout/ListMenu';
import { Outlet } from 'react-router';

export default function DefaultLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className='M-Container'>
            <Layout.Header className='M-Header'>
                <div className='M-Logo-Container'>
                    <LazyLoadImage src='../Images/Logo.png' className='M-Logo' />
                </div>
                <div>
                    <MenuOutlined className='M-Icon' onClick={() => setCollapsed(!collapsed)} />
                </div>
            </Layout.Header>
            <Layout>
                <Layout.Sider className='bg-tranparent' collapsed={collapsed} collapsible trigger={null} theme='light'>
                    <ListMenu />
                </Layout.Sider>
                <Layout className='ms-3 mt-3 me-3 mb-3'>
                    <Layout.Content className='M-Content'>
                        <Outlet />
                    </Layout.Content>
                    <Layout.Footer className='M-Footer'>
                        Footer
                    </Layout.Footer>
                </Layout>
            </Layout>
        </Layout>
    )
}
