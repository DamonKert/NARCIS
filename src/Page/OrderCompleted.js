import { CheckCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'

export default function OrderCompleted() {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='text-center'>
                <Typography.Title level={2}>
                    Order Completed
                    <CheckCircleFilled className='ms-3 text-success'/>
                </Typography.Title>
                <Typography.Title level={1}>
                    Our staff will contact you shortly
                </Typography.Title>
            </div>
        </div>
    )
}
