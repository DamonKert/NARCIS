import { Button, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import ProvincesSelect from '../../../Component/Admin/Select/ProvincesSelect'
import ClothesSelect from '../../../Component/Admin/Select/ClothesSelect'

export default function OrderForm() {
  return (
    <Form layout='vertical'>
      <Card className='border-0'>
        <CardHeader className='border-0 bg-white'>
          <h1>Order Form</h1>
        </CardHeader>
        <CardBody>
          <Row gutter={[24]}>
            <Col xs={24} md={12}>
              <Form.Item label="Customer Name" name={"FullName"}>
                <Input placeholder='Customer Name' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Address" name={"Address"}>
                <Input placeholder='Address' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Phone number" name={"Phonenumber"}>
                <Input placeholder='Phone number' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Order Status" name={"OrderStatusId"}>
                <Select placeholder="Order Status" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Delivery Status" name={"DeliveryStatusId"}>
                <Select placeholder="Delivery Status" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Payment Status" name={"PaymentStatusId"}>
                <Select placeholder="Payment Status" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Provinces" name={"CityProvinceId"}>
                <ProvincesSelect />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Note" name={"Note"}>
                <Input.TextArea placeholder='Note' />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Clothes" name={"ClothesId"}>
                <ClothesSelect />
                {/* <Select placeholder="Clothes" className='w-100'></Select> */}
              </Form.Item>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className='border-0 bg-white d-flex justify-content-center'>
          <Button htmlType='submit'>SUBMIT</Button>
        </CardFooter>
      </Card>
    </Form>
  )
}
