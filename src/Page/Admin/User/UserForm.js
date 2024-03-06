import { Button, Col, Form, Input, Row, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired } from '../../../Asset/Validated/Validated';
import { API } from '../../../API/API';
import { CREATE_USER, GET_USER_BY_ID, UPDATE_USER } from '../../../API/URL';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notification } from '../../../Asset/ShowNotification';

export default function UserForm() {
    const [form] = Form.useForm();
    const [Loading, setLoading] = useState(false);
    const [SaveData, setSaveData] = useState({});
    const navigation = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.toLocaleLowerCase();
    const IsUpdate = pathname.includes('edit');
    const HandleSubmit = (Data) => {
        setLoading(true);
        if (IsUpdate) {
            var Check = false;
            Object.keys(Data).forEach(key => {
                if (Data[key] !== SaveData[key]) {
                    Check = true;
                    return;
                }
            })
            if (Check === true) {
                Data.ID = pathname.split('/')[3];
                console.log(Data);
                API.POST(UPDATE_USER, Data)
                    .then(res => {
                        setLoading(false);
                        if (res.StatusCode === 200) {
                            Notification.ShowSuccess("Success", res.Message);
                            navigation(`/Admin/User`);
                        } else {
                            Notification.ShowError("Error", res.Message);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err);
                    })
            } else {
                Notification.ShowSuccess("Success", "Nothing has been changed");
                navigation(`/Admin/User`);
            }
        } else {
            API.POST(CREATE_USER, Data)
                .then(res => {
                    setLoading(false);
                    if (res.StatusCode === 201) {
                        Notification.ShowSuccess("Success", res.Message);
                        navigation(`/Admin/User`);
                    }
                    else if (res.StatusCode === 400) {
                        Notification.ShowError(res.Message, res.Errors[0]);
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
            setLoading(true);
            API.GET(GET_USER_BY_ID(pathname.split('/')[3]))
                .then(res => {
                    setLoading(false);
                    if (res.StatusCode === 200) {
                        const Data = res.Data;
                        form.setFieldValue("Username", Data.Username);
                        form.setFieldValue("Password", Data.Password);
                        form.setFieldValue("ConfirmPassword", Data.Password);
                        form.setFieldValue("PhoneNumber", Data.PhoneNumber);
                        form.setFieldValue("Email", Data.Email);
                        form.setFieldValue("ChatId", Data.ChatId);
                        form.setFieldValue("RoleId", Data.Role.Id);
                        setSaveData({
                            "Username": Data.Username,
                            "Password": Data.Password,
                            "ConfirmPassword": Data.Password,
                            "PhoneNumber": Data.PhoneNumber,
                            "Email": Data.Email,
                            "ChatId": Data.ChatId,
                            "RoleId": Data.Role.Id
                        });
                    } else if (res.StatusCode === 404) {
                        Notification.ShowError("Error 404", res.Message);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                })
        }
    }, [location, form, IsUpdate, pathname])
    return (
        <Spin spinning={Loading}>
            <Form
                form={form}
                layout='vertical'
                onFinish={HandleSubmit}>
                <Card className='border-0'>
                    <CardHeader className='border-0 bg-white'>
                        <h1>{IsUpdate ? 'Edit User information' : 'User Form'}</h1>
                    </CardHeader>
                    <CardBody>
                        <Row gutter={[40, 0]}>
                            <Col xs={24}>
                                <Form.Item label="Username" name={"Username"}
                                    rules={[{
                                        ...GetRequired("Username")
                                    }, {
                                        min: 6,
                                        message: "Username must be at least 6 letter"
                                    }]}>
                                    <Input
                                        allowClear
                                        placeholder='Username' autoComplete='off' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}
                                rules={[{

                                }]}>
                                <Form.Item label="Telegram ID" name={"ChatId"}>
                                    <Input allowClear placeholder='Telegram ID' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Role" name={"RoleId"} rules={[{
                                    ...GetRequired("Role")
                                }]}>
                                    <Select
                                        allowClear
                                        placeholder="Pick a Roles"
                                        options={[{
                                            value: 1,
                                            label: "Admin"
                                        }, {
                                            value: 2,
                                            label: "User"
                                        }, {
                                            value: 3,
                                            label: "Developer"
                                        }]}>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Password" name={"Password"}
                                    rules={[{
                                        ...GetRequired("Password")
                                    }, {
                                        min: 8,
                                        message: "Password must be at least 8 letter"
                                    }]}>
                                    <Input.Password
                                        allowClear
                                        placeholder='Password' autoComplete='new-password' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Confirm Password" name={"ConfirmPassword"}
                                    dependencies={['Password']}
                                    rules={[{
                                        ...GetRequired("Confirm Password")
                                    }, ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value !== "" && value !== getFieldValue('Password')) {
                                                return Promise.reject("Password and confirm password not match");
                                            }
                                            return Promise.resolve();
                                        }
                                    })]}>
                                    <Input.Password allowClear placeholder='Confirm Password' autoComplete='new-password' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Email" name={"Email"}
                                    rules={[{
                                        ...GetRequired("Email")
                                    }, {
                                        type: 'email',
                                        message: "Invalid Email"
                                    }]}>
                                    <Input allowClear placeholder='Email' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item label="Phonenumber" name={"PhoneNumber"}
                                    rules={[{
                                        ...GetRequired("Phonenumber")
                                    }, {
                                        min: 9,
                                        max: 10,
                                        message: "Phonenumber must be 9-10"
                                    }, {
                                        validator(_, value) {
                                            if (value !== "" && value.length >= 9 && value.length <= 10 && value[0] !== '0') {
                                                return Promise.reject("Invalid Phonenumber");
                                            }
                                            return Promise.resolve();
                                        }
                                    }]}>
                                    <Input allowClear placeholder='Phonenumber' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className='border-0 bg-white p-3 d-flex justify-content-center'>
                        <Button htmlType='submit'>SUBMIT</Button>
                    </CardFooter>
                </Card>
            </Form >
        </Spin>
    )
}
