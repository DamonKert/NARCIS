import { Button, Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired, checkFile } from '../../../Asset/Validated/Validated';
import { PlusOutlined } from '@ant-design/icons';
import ImageGroupPreview from '../../../Component/ImageGroupPreview';
import { getBase64 } from '../../../Asset/Tool Helper/Tool';
import { API } from '../../../API/API';
import { GET_MODEL } from '../../../API/URL';
export default function ClothForm() {
    // const [PreviewImage,setPreviewImage] = useState();
    const [ImagePreview, setImagePreview] = useState("");
    const [PreviewShow, setPreviewShow] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [ListModel, setListModel] = useState([]);
    const [ListCategory, setListCategory] = useState([{
        value: "Top & T-Shirt",
        label: "Top & T-Shirt"
    }, {
        label: "Shirt & Blouse",
        value: "Shirt & Blouse"
    }, {
        value: "One Piece & Dress",
        label: "One Piece & Dress"
    }, {
        value: "MINI-MIDI",
        label: "MINI-MIDI"
    }, {
        value: "LONG-MIDI",
        label: "LONG-MIDI"
    }, {
        value: "JUMPSUIT",
        label: "JUMPSUIT"
    }, {
        value: "Pants & Shorts",
        label: "Pants & Shorts",
    }, {
        value: "TROUSERS",
        label: "TROUSERS"
    }, {
        value: "SHORTS",
        label: "SHORTS"
    }, {
        value: "SKIRT",
        label: "SKIRT"
    },]);
    const HandleSubmit = (Data) => {
        console.log(Data);
    }

    useEffect(() => {
        API.GET(GET_MODEL)
            .then(res => {
                if (res.StatusCode === 200) {
                    const Temp = [];
                    res.Data.forEach(item => {
                        Temp.push({
                            value: item.Id,
                            label: item.Id + ' / ' + item.Name
                        })
                    });
                    setListModel([...Temp]);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const HandlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImagePreview(file.url || file.preview);
        setPreviewShow(true);
    }
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    return (
        <Form layout='vertical'
            onFinish={HandleSubmit}>
            <Card className='border-0'>
                <CardHeader className='border-0 bg-white'>
                    <h1>Cloth Form</h1>
                </CardHeader>
                <CardBody>
                    <Row
                        gutter={[30, 0]}
                    >
                        <Col xs={24}>
                            <Form.Item label="Name" name={"Name"} rules={[{
                                ...GetRequired("Name")
                            }]}>
                                <Input placeholder='Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Gategory" name={"GategoryId"} rules={[{
                                ...GetRequired("Gategory")
                            }]}>
                                <Select showSearch autoClearSearchValue placeholder='Gategory' options={ListCategory} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Model" name={"ModelId"} rules={[{
                                ...GetRequired("Model")
                            }]}>
                                <Select showSearch autoClearSearchValue placeholder='Model' options={ListModel} />
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
                            <Form.Item
                                label="Images"
                                name={"Images"}
                                getValueFromEvent={checkFile}
                                valuePropName="fileList"
                                rules={[{
                                    ...GetRequired("Images")
                                }]}>

                                <Upload.Dragger
                                    listType="picture-circle"

                                    beforeUpload={(file) => {
                                        console.log(file);
                                        return false;
                                    }}
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onPreview={HandlePreview}
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
            <ImageGroupPreview Images={[ImagePreview]} Show={PreviewShow} OnClose={() => setPreviewShow(false)} />
        </Form >
    )
}
