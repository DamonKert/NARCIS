import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Drawer, Input, Typography } from 'antd'
import React from 'react'

export default function SearchDrawer({ onClose, show }) {
    return (
        <Drawer open={show} placement='top' closeIcon={false}  onClose={onClose} className='d-flex'>
            <CloseOutlined onClick={onClose} className='position-absolute' style={{ fontSize: 30, right: 25, top: 25, fontWeight: 400 }} />
            <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                <div className='M-Search-Input-Container d-flex flex-column justify-content-center align-items-center'>
                    <div className='text-center'>
                        <Typography.Title level={2} className='fw-bold'>SEARCH</Typography.Title>
                    </div>
                    <div className='M-Search-Input p-0 pt-lg-3 pb-lg-3 d-flex mt-3' style={{ borderBottom: "1px solid black" }}>
                        <Input className='M-Remove-Input-Focus border-0' style={{ fontSize: 20 }} /><SearchOutlined style={{ fontSize: 25 }} />
                    </div>
                </div>
            </div>
        </Drawer>
    )
}
