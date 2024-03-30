import { Button, Col, Form, Input, InputNumber, Row, Spin, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired, checkFile } from '../../../Asset/Validated/Validated';
import { PlusOutlined } from '@ant-design/icons';
import ImageGroupPreview from '../../../Component/ImageGroupPreview';
import { ConvertImageAntdToOrigin, ConvertObjectToFormData, GetRemainingImage, GetSelected, getBase64 } from '../../../Asset/Tool Helper/Tool';
import { API } from '../../../API/API';
import { Notification } from '../../../Asset/ShowNotification'
import { CREATE_CLOTHES, GET_CLOTHES_BY_ID, UPDATE_CLOTHES } from '../../../API/URL';
import CategoriesSelect from '../../../Component/Admin/Select/CategoriesSelect';
import ModalSelect from '../../../Component/Admin/Select/ModelSelect';
import SizesSelect from '../../../Component/Admin/Select/SizesSelect';
import { useLocation, useNavigate } from 'react-router-dom';
export default function ClothForm() {
    const [form] = Form.useForm();
    const [Loading, setLoading] = useState(false);
    const [SaveData, setSaveData] = useState({});
    const [PreviewShow, setPreviewShow] = useState(false);
    const [ImagePreview, setImagePreview] = useState("");
    const [fileList, setFileList] = useState([]);
    const navigation = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const IsUpdate = pathname.toLocaleLowerCase().includes(`edit`);

    const CheckChanges = (Data, SaveData) => {
        var Check = false;
        Object.keys(Data).forEach(key => {
            if (Data[key] === null) {
                if (null == SaveData[key]) {
                    Check = true;
                }
            } else if (Array.isArray(SaveData[key])) {
                Data[key].forEach((item, index) => {
                    if (Data[key][index] !== SaveData[key][index]) {
                        Check = true;
                    }
                })
            } else if (Data[key] !== SaveData[key]) {
                Check = true;
            }
        })
        return Check;
    }

    const HandleSubmit = (Data) => {
        setLoading(true);
        Data.CategoryId = GetSelected(Data.CategoryId);
        Data.ModelId = GetSelected(Data.ModelId);
        Data.SizeIDs = Data.SizeIDs.map(item => +GetSelected(item));
        if (IsUpdate) {
            Data.RemainingImages = GetRemainingImage(fileList);
            var Check = CheckChanges(Data, SaveData);
            if (Data.Images !== undefined) {
                Check = true;
                Data.Images = ConvertImageAntdToOrigin(Data.Images.filter(item => typeof item.uid === 'string'));
            } else {
                Data.Images = null;
            }
            if (Check === true) {
                Data.ID = pathname.split('/')[3];
                const fileForm = ConvertObjectToFormData(Data);
                API.POST(UPDATE_CLOTHES(Data.ID), fileForm)
                    .then(res => {
                        setLoading(false);
                        if (res.StatusCode === 200) {
                            Notification.ShowSuccess("Success", res.Message);
                            navigation('/Admin/Cloth');
                        } else {
                            Notification.ShowError("Error " + res.StatusCode, res.Message);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err);
                    })
            } else {
                Notification.ShowSuccess('Success', "Nothing has been changed");
                navigation('/Admin/Cloth');
            }
        } else {
            Data.Images = ConvertImageAntdToOrigin(Data.Images);
            const fileForm = ConvertObjectToFormData(Data);
            API.POST(CREATE_CLOTHES, fileForm)
                .then(res => {
                    setLoading(false);
                    if (res.StatusCode === 201) {
                        Notification.ShowSuccess("Success", res.Message);
                        navigation(`/Admin/Cloth`);
                    } else {
                        Notification.ShowError("Error " + res.StatusCode, res.Message);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        if (IsUpdate) {
            API.GET(GET_CLOTHES_BY_ID(pathname.split('/')[3]))
                .then(res => {
                    if (res.StatusCode === 200) {
                        const Data = res.Data;
                        form.setFieldValue("Name", Data.Name);
                        form.setFieldValue("Price", Data.Price);
                        form.setFieldValue("Discount", Data.Discount);
                        form.setFieldValue("CategoryId", Data.Category.Id + '/' + Data.Category.Name);
                        form.setFieldValue("ModelId", Data.Model.Id + '/' + Data.Model.Name);
                        form.setFieldValue("SizeIDs", Data.Sizes.map(item => item.Id + '/' + item.Name));
                        form.setFieldValue("Code", Data.Code);
                        form.setFieldValue("Description", Data.Description);
                        const TempFileList = [];
                        Data.ImagePaths.forEach((item, index) => {
                            TempFileList.push({
                                uid: (index + 1) * -1,
                                name: 'image.png',
                                status: 'done',
                                url: item,
                            });
                        })
                        setFileList([...TempFileList]);
                        setSaveData({
                            "Name": Data.Name,
                            "Price": Data.Price,
                            "Discount": Data.Discount,
                            "CategoryId": "" + Data.Category.Id,
                            "ModelId": "" + Data.Model.Id,
                            "SizeIDs": Data.Sizes.map(item => item.Id),
                            "Code": Data.Code,
                            "Description": Data.Description,
                            "RemainingImages": Data.ImagePaths.map((item) => item)
                        });
                    } else {
                        Notification.ShowError("Error " + res.StatusCode, res.Message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [IsUpdate, pathname, form])

    const HandlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImagePreview(file.url || file.preview);
        setPreviewShow(true);
    }
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    return (
        <Spin spinning={Loading}>
            <Form form={form} layout='vertical'
                onFinish={HandleSubmit}>
                <Card className='border-0'>
                    <CardHeader className='border-0 bg-white'>
                        <h1>{IsUpdate ? 'Edit Cloth information' : 'Cloth Form'}</h1>
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
                                <Form.Item label="Price" name={"Price"} rules={[{
                                    ...GetRequired("Price")
                                }]}>
                                    <InputNumber className='w-100' placeholder='Price' min={1} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Discount" name={"Discount"} rules={[{
                                    ...GetRequired("Discount")
                                }]}>
                                    <InputNumber className='w-100' placeholder='Discount' min={0} max={100} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <CategoriesSelect Name={"CategoryId"} />
                            </Col>
                            <Col xs={24} lg={12}>
                                <ModalSelect Name={"ModelId"} />
                            </Col>
                            <Col xs={24} lg={12}>
                                <SizesSelect mode={"multiple"} Name={"SizeIDs"} />
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Code" name={"Code"} rules={[{
                                    ...GetRequired("Code")
                                }]}>
                                    <Input placeholder='Code' />
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
                                    rules={IsUpdate ? [() => ({
                                        validator(_, value) {
                                            return fileList.length > 0 ? Promise.resolve() : Promise.reject("Image needed")
                                        }
                                    })] : [{
                                        ...GetRequired("Images")
                                    }]}
                                >

                                    <Upload.Dragger
                                        listType="picture-circle"
                                        beforeUpload={(file) => {
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
        </Spin>
    )
}
