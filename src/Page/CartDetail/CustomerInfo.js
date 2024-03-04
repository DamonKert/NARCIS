import { Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import React from 'react'

export default function CustomerInfo() {
    return (
        <div className='p-3 p-md-0'>
            <Typography.Title level={4} className='text-center'>
                Contact information
            </Typography.Title>
            <div className='mt-5'>
                <Form layout='vertical' onFinish={(FormData) => {
                    console.log(FormData);
                }}>
                    <Row gutter={[12, 12]}>
                        <Col xs={24} md={12}>
                            <Form.Item name={'Name'} label="Name" rules={[
                                { required: true, message: "Please input Name" }
                            ]}>
                                <Input placeholder='Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name={'Phonenumber'} label="Phonenumber" rules={[
                                { required: true, message: "Please input Phonenumber" },
                            ]}>
                                <Input placeholder='Phonenumber' />
                                {/* <InputNumber placeholder='Phonenumber' className='w-100'/> */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name={'Province'} label="Province" rules={[
                                { required: true, message: "Please input Province" }
                            ]}>
                                {/* <Input placeholder='Province' /> */}
                                <Select placeholder='Province' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name={'Address'} label="Address" rules={[
                                { required: true, message: "Please input Address" }
                            ]}>
                                <Input placeholder='Address' />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item name={'Note'} label="Note">
                                <Input.TextArea rows={4} placeholder='Note' />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <div className='d-flex justify-content-center'>
                                <Button htmlType='submit' className='border-0 bg-dark text-white M-Completed-Order-Button'>Completed Order</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}
