import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired } from '../../../Asset/Validated/Validated';
export default function UserForm() {
    const HandleSubmit = (Data) => {
        console.log(Data);
    }
    return (
        <Form layout='vertical' onFinish={HandleSubmit}>
            <Card className='border-0'>
                <CardHeader className='border-0 bg-white'>
                    <h1>UserForm</h1>
                </CardHeader>
                <CardBody>
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
                    <Form.Item label="Email" name={"Email"}
                        rules={[{
                            ...GetRequired("Email")
                        }, {
                            type: 'email',
                            message: "Invalid Email"
                        }]}>
                        <Input allowClear placeholder='Email' />
                    </Form.Item>
                    <Form.Item label="Phonenumber" name={"Phonenumber"}
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
                    <Form.Item label="Role" name={"Role"} rules={[{
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
                                label: "Employee"
                            }]}>
                        </Select>
                    </Form.Item>
                </CardBody>
                <CardFooter className='border-0 bg-white p-3 d-flex justify-content-center'>
                    <Button htmlType='submit'>SUBMIT</Button>
                </CardFooter>
            </Card>
        </Form >
    )
}
