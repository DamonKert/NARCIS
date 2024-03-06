import { Button, Form, InputNumber, Modal } from 'antd'
import React from 'react'
import { API } from '../../../API/API';
import { UPDATE_PROVINCE_DELIVERYFEE } from '../../../API/URL';
import { Notification } from '../../../Asset/ShowNotification';

export default function ProvinceModal({ GetData, Show, OnClose, Data, setData }) {
    const [form] = Form.useForm();
    const HandleOpenChange = (value) => {
        if (value === true) {
            form.setFieldValue("cost", Data.DeliveryFee);
        } else {
            form.setFieldValue("cost", null);
        }
    }

    const HandleSubmit = (NewData) => {
        console.log(NewData);
        API.POST(UPDATE_PROVINCE_DELIVERYFEE(Data.Id, NewData.cost))
            .then(res => {
                if (res.StatusCode === 200) {
                    Notification.ShowSuccess(res.Message, "DeliveryFee successfully updated");
                    GetData();
                    HandleClose();
                } else {
                    Notification.ShowSuccess("Error", res.Message);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const HandleClose = () => {
        setData({});
        OnClose();
    }
    return (
        <Modal centered footer={false} open={Show} onCancel={HandleClose} afterOpenChange={HandleOpenChange}>
            <Form onFinish={HandleSubmit} form={form} className='p-3 pb-0 w-100 d-flex align-items-center flex-column'>
                <h1>{Data.Name_en === undefined ? "" : Data.Name_en}</h1>
                <h4>Update DeliveryFee</h4>
                <Form.Item name={"cost"} className='w-100 mt-4'>
                    <InputNumber className='w-100' />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>SUBMIT</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
