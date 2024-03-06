import React, { useState } from "react";
import { CardHeader } from 'react-bootstrap'
import { Steps, Form, Input, Button } from "antd";
import { GetRequired } from '../Asset/Validated/Validated';
import Cookies from 'js-cookie';
import { List_Image } from '../Image/ListImage';
import { LazyLoadImage } from 'react-lazy-load-image-component'
export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const doLogin = (data) => {
    console.log(data);
    console.log('fasdf');
    if (data.Username != null && data.Password != null) {
      console.log('in');
      fetch(`https://localhost:7266/api/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.StatusCode === 401) {
            setErrorMessage(data.Message);
          } else if (data.StatusCode === 200) {
            Cookies.set('userToken', data.Token);
            console.log(Cookies.get('userToken'));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="container vh-100 d-flex justify-content-center">
      <div className=" d-flex justify-content-center align-items-center d-flex flex-column">
        <LazyLoadImage className='M-Logo-Responsive' style={{ width: '250px', height: 'auto' }} src={List_Image.Logo} alt={"Narcis Logo"} />
       <br></br>
        <Form onFinish={doLogin} className="d-flex flex-column">
          <Form.Item 
            label={<span className ="fs-4">Username</span>}
            name={'Username'}
            rules={[{
              ...GetRequired("Username")

            }]}
          >
            <Input name="Username" />
          </Form.Item>
          <Form.Item
      
            label={<span className ="fs-4">Password</span>}
            name={'Password'}

            rules={[{
              ...GetRequired("Password")
            }, {
              min: 5,
              message: "Password must be at least 8 letter"
            }]}>
            <Input.Password name="Password" />
          </Form.Item>
          {errorMessage ? (<span className="text-danger mb-3">{errorMessage}</span>) : ('')}
          <Button type="primary"   htmlType='submit'>
            Login
          </Button>

        </Form>
      </div>
    </div>
  );
}
