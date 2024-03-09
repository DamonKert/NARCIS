import { Button, Form } from 'antd'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'

export default function OrderForm() {
  return (
    <Form>
        <Card className='border-0'>
            <CardHeader className='border-0 bg-white'>
                <h1>Order Form</h1>
            </CardHeader>
            <CardBody>
                
            </CardBody>
            <CardFooter className='border-0 bg-white d-flex justify-content-center'>
                <Button htmlType='submit'>SUBMIT</Button>
            </CardFooter>
        </Card>
    </Form>
  )
}
