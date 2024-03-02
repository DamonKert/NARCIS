import { Divider, Drawer, Image } from 'antd'
import React from 'react'
import ListMenu from '../ListMenu'
import { Link } from 'react-router-dom'
import { List_Image } from '../../Image/ListImage'
import { CloseOutlined } from '@ant-design/icons'

export default function ListMenuDrawer({ isInline, show, onClose }) {
    return (
        <Drawer placement='left' onClose={onClose} open={show} closable={false}>
            <CloseOutlined onClick={onClose} className='position-absolute' style={{ fontSize: 25, right: 25, top: 25, fontWeight: 400 }} />
            <div className='d-flex justify-content-center mt-4'>
                <Link to='/'>
                    <Image className='M-Logo-Responsive' src={List_Image.Logo} />
                </Link>
            </div>
            <Divider />
            <ListMenu isInline={true} />
        </Drawer>
    )
}
