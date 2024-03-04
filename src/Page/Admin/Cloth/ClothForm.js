import { Button, Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd'
import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired } from '../../../Asset/Validated/Validated';
import { PlusOutlined } from '@ant-design/icons';
export default function ClothForm() {
    const [ListCategory, setListCategory] = useState([{
        value: "Top & T-Shirt",
        label: "Top & T-Shirt"
    }, {
        label: "Shirt & Blouse",
        value: "Shirt & Blouse"
    }, {
        // value: 3,
        value: "One Piece & Dress",
        label: "One Piece & Dress"
    }, {
        // value: 4,
        value: "MINI-MIDI",
        label: "MINI-MIDI"
    }, {
        // value: 5,
        value: "LONG-MIDI",
        label: "LONG-MIDI"
    }, {
        // value: 6,
        value: "JUMPSUIT",
        label: "JUMPSUIT"
    }, {
        // value: 7,
        value: "Pants & Shorts",
        label: "Pants & Shorts",
    }, {
        // value: 8,
        value: "TROUSERS",
        label: "TROUSERS"
    }, {
        // value: 9,
        value: "SHORTS",
        label: "SHORTS"
    }, {
        // value: 10,
        value: "SKIRT",
        label: "SKIRT"
    },]);
    const HandleSubmit = (Data) => {
        console.log(Data);
    }
    return (
        <Form layout='vertical'
            onFinish={HandleSubmit}>
            <Card className='border-0'>
                <CardHeader className='border-0 bg-white'>
                    <h1>Cloth Form</h1>
                </CardHeader>
                <CardBody>
                    <Row
                        gutter={[30, 20]}
                    >
                        <Col xs={24} lg={12}>
                            <Form.Item label="Name" name={"Name"} rules={[{
                                ...GetRequired("Name")
                            }]}>
                                <Input placeholder='Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Gategory" name={"Gategory"} rules={[{
                                ...GetRequired("Gategory")
                            }]}>
                                <Select showSearch autoClearSearchValue placeholder='Gategory' options={ListCategory} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Price" name={"Price"} rules={[{
                                ...GetRequired("Price")
                            }]}>
                                <InputNumber className='w-100' placeholder='Price' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Discount" name={"Discount"} rules={[{
                                ...GetRequired("Discount")
                            }]}>
                                <InputNumber className='w-100' placeholder='Discount' />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label="Description" name={"Description"} rules={[{
                                ...GetRequired("Description")
                            }]}>
                                <Input.TextArea rows={4} placeholder='Description' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} >
                            <Form.Item label="Images" name={"Images"} rules={[{
                                ...GetRequired("Images")
                            }]}>

                                <Upload.Dragger
                                    listType="picture-circle"
                                    beforeUpload={(file) => {
                                        console.log(file);
                                        return false;
                                    }}
                                    onPreview={false}
                                    multiple
                                >
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload (Click or Drag your file here)</div>
                                    </button>
                                </Upload.Dragger>
                            </Form.Item>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter className='p-3 border-0 bg-white d-flex justify-content-center'>
                    <Button htmlType='submit'>SUBMIT</Button>
                </CardFooter>
            </Card>
        </Form >
    )
}
