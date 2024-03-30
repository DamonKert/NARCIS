import { Divider, Drawer, Image } from 'antd'
import React from 'react'
import ListMenu from '../ListMenu'
import { Link } from 'react-router-dom'
import { List_Image } from '../../Image/ListImage'
import { CloseOutlined } from '@ant-design/icons'
import CurrencyDropDown from '../CurrencyDropDown'

export default function ListMenuDrawer({ isInline, show, onClose }) {
    const HandleCLose = () => {
        onClose();
    }
    return (
        <Drawer placement='left' onClose={HandleCLose} open={show} closable={false}>
            <CloseOutlined onClick={onClose} className='position-absolute' style={{ fontSize: 25, right: 25, top: 25, fontWeight: 400 }} />
            <div className='d-flex flex-column align-items-center mt-4'>
                <Link to='/'>
                    <Image className='M-Logo-Responsive' src={List_Image.Logo} />
                </Link>
                <div className='d-flex align-items-center mt-4'>
                    <Link className='text-dark text-decoration-none' to={"/View-Recently"}>VIEWED</Link>
                    <Divider type='vertical' />
                    <CurrencyDropDown />
                </div>
            </div>
            <Divider />
            <ListMenu isInline={true} onClose={HandleCLose} />
        </Drawer>
    )
}
