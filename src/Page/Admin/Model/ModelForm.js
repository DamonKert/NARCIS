import { Button, Col, Form, Input, Row, Select, Upload } from 'antd'
import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired } from '../../../Asset/Validated/Validated'
import { PlusOutlined } from '@ant-design/icons'

export default function ModelForm() {
    // const [fileList, setFileList] = useState([
    //     {
    //         uid: '-1',
    //         name: 'image.png',
    //         status: 'done',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    // ]);
    // const [Profile, setProfile] = useState({});
    const Sizes = [{
        label: "XS",
        value: 1
    }, {
        label: "S",
        value: 2
    }, {
        label: "M",
        value: 3
    }, {
        label: "L",
        value: 4
    }, {
        label: "XL",
        value: 5
    }, {
        label: "XXL",
        value: 6
    }]
    const HandleSubmit = (Data) => {
        console.log(Data);
    }
    return (
        <Form layout='vertical' onFinish={HandleSubmit}>
            <Card className='border-0'>
                <CardHeader className='border-0 bg-white'>
                    <h1>Model Form</h1>
                </CardHeader>
                <CardBody>
                    <Row gutter={[30, 20]}>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Name" name={"Name"} rules={[{
                                ...GetRequired("Name")
                            }]}>
                                <Input placeholder='Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Age" name={"Age"} rules={[{
                                ...GetRequired("Age")
                            }]}>
                                <Input placeholder='Age' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Height" name={"Height"} rules={[{
                                ...GetRequired("Height")
                            }]}>
                                <Input placeholder='Height' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Weight" name={"Weight"} rules={[{
                                ...GetRequired("Weight")
                            }]}>
                                <Input placeholder='Weight' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Bottom" name={"Bottom"} rules={[{
                                ...GetRequired("Bottom")
                            }]}>
                                <Select options={Sizes} placeholder="Bottom Sizes">
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Top" name={"Top"} rules={[{
                                ...GetRequired("Top")
                            }]}>
                                <Select options={Sizes} placeholder="Top Sizes">
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label="Profile" name={"Profile_Image"} rules={[{
                                ...GetRequired("Profile")
                            }]}>

                                <Upload
                                    listType="picture-circle"
                                    beforeUpload={(file) => {
                                        console.log(file);
                                        return false;
                                    }}
                                    onPreview={false}
                                    maxCount={1}
                                >
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter className='border-0 bg-white d-flex justify-content-center align-items-center p-3'>
                    <Button htmlType='submit'>SUBMIT</Button>
                </CardFooter>
            </Card>
        </Form >
    )
}
