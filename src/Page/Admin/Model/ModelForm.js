import { Button, Col, Form, Input, InputNumber, Row, Select, Spin, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired, checkFile } from '../../../Asset/Validated/Validated'
import { PlusOutlined } from '@ant-design/icons'
import { API } from '../../../API/API'
import { CREATE_MODEL, GET_MODEL_BY_ID, UPDATE_MODEL } from '../../../API/URL'
import { Notification } from '../../../Asset/ShowNotification'
import { ConvertImageAntdToOrigin, ConvertObjectToFormData, getBase64 } from '../../../Asset/Tool Helper/Tool';
import { useLocation, useNavigate } from 'react-router-dom'
import ImageGroupPreview from '../../../Component/ImageGroupPreview';

export default function ModelForm() {
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false);
    const [PreviewShow, setPreviewShow] = useState(false);
    const [SaveData, setSaveData] = useState({});
    const [ImagePreview, setImagePreview] = useState("");
    const [fileList, setFileList] = useState([]);
    const navigation = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.toLocaleLowerCase();
    const IsUpdate = pathname.includes("edit");
    const Sizes = [{
        label: "XS",
        value: "XS"
    }, {
        label: "S",
        value: "S"
    }, {
        label: "M",
        value: "M"
    }, {
        label: "L",
        value: "L"
    }, {
        label: "XL",
        value: "XL"
    }, {
        label: "XXL",
        value: "XXL"
    }]

    const HandleSubmit = (Data) => {
        setloading(true);
        if (IsUpdate) {
            var Check = false;
            Object.keys(Data).forEach(key => {
                if (Data[key] !== SaveData[key]) {
                    Check = true;
                }
            })
            if (Data.Profile !== undefined) {
                Check = true;
                Data.Profile = ConvertImageAntdToOrigin(Data.Profile)[0];
            } else {
                Data.Profile = null;
            }
            if (Check === true) {
                Data.ID = pathname.split('/')[3];
                const formData = ConvertObjectToFormData(Data);
                API.POST(UPDATE_MODEL, formData)
                    .then(res => {
                        setloading(false);
                        if (res.StatusCode === 200) {
                            Notification.ShowSuccess('Success', res.Message);
                            navigation(`/Admin/Model`);
                        } else {
                            Notification.ShowError("Error", res.Message);
                        }
                    })
                    .catch(err => {
                        setloading(false);
                        console.log(err);
                    });
            } else {
                Notification.ShowSuccess('Success', "Nothing has been changed");
                navigation(`/Admin/Model`);
            }
        } else {
            Data.Profile = ConvertImageAntdToOrigin(Data.Profile)[0];
            const formData = ConvertObjectToFormData(Data);
            API.POST(CREATE_MODEL, formData)
                .then(res => {
                    setloading(false);
                    if (res.StatusCode === 201) {
                        Notification.ShowSuccess("Success", res.Message);
                        navigation(`/Admin/Model`);
                    }
                })
                .catch(err => {
                    setloading(false);
                    console.log(err);
                });
        }
    }
    const HandlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImagePreview(file.url || file.preview);
        setPreviewShow(true);
    }
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    useEffect(() => {
        if (IsUpdate) {
            setloading(true);
            API.GET(GET_MODEL_BY_ID(pathname.split('/')[3]))
                .then(res => {
                    setloading(false);
                    if (res.StatusCode === 200) {
                        const Data = res.Data;
                        form.setFieldValue("Name", Data.Name);
                        form.setFieldValue("Age", Data.Age);
                        form.setFieldValue("Height", Data.Height);
                        form.setFieldValue("Weight", Data.Weight);
                        form.setFieldValue("Bottom", Data.Bottom);
                        form.setFieldValue("Top", Data.Top);
                        setFileList([...[
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: Data.ProfilePicture,
                            }
                        ]]);
                        setSaveData({
                            "Name": Data.Name,
                            "Age": Data.Age,
                            "Height": Data.Height,
                            "Weight": Data.Weight,
                            "Bottom": Data.Bottom,
                            "Top": Data.Top
                        });
                    }
                    else if (res.Status === 400) {
                        Notification.ShowError("Error 400", res.Errors.id[0] + "for ID");
                    }
                    else {
                        Notification.ShowError("Error 404", res.Message);
                    }
                })
                .catch(err => {
                    setloading(false);
                    console.log(err);
                })
        }
    }, [location, form, IsUpdate, pathname])
    return (
        <Spin spinning={loading}>
            <Form
                requiredMark={"optional"}
                layout='vertical' form={form} onFinish={HandleSubmit}>
                <Card className='border-0'>
                    <CardHeader className='border-0 bg-white'>
                        <h1>{IsUpdate ? 'Edit Model information' : 'Model Form'}</h1>
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
                                <Form.Item label="Age" name={"Age"}
                                    rules={[
                                        (getFieldValue) => ({
                                            validator(_, value) {
                                                if (value === null || (value >= 1 && value <= 125)) {
                                                    return Promise.resolve();
                                                }
                                                if (value <= 1) {
                                                    return Promise.reject("Min age is 1 year old");
                                                }
                                                return Promise.reject("Max age is 125 year old");
                                            }
                                        })
                                    ]}
                                >
                                    <InputNumber className='w-100' placeholder='Age' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Height (cm)" name={"Height"} rules={[{
                                    ...GetRequired("Height")
                                }]}>
                                    <InputNumber className='w-100' placeholder='Height' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Weight (kg)" name={"Weight"} rules={[{
                                    ...GetRequired("Weight")
                                }]}>
                                    <InputNumber className='w-100' placeholder='Weight' />
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
                                <Form.Item label="Profile"
                                    getValueFromEvent={checkFile}
                                    name={"Profile"}
                                    rules={IsUpdate ? [] : [{
                                        ...GetRequired("Profile")
                                    }]}>
                                    <Upload
                                        listType="picture-circle"
                                        beforeUpload={(file) => {
                                            return false;
                                        }}
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={HandlePreview}
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
                <ImageGroupPreview Images={[ImagePreview]} Show={PreviewShow} OnClose={() => setPreviewShow(false)} />
            </Form >
        </Spin>
    )
}
