import React from "react";
import { Form, Input, Button } from "antd";
import { API } from "../../API/API";
import { LOGIN } from "../../API/URL";
import { Notification } from "../../Asset/ShowNotification";

export default function Login() {
  const HandleSubmit = (data) => {
    API.POST(LOGIN, data)
      .then((res) => {
        if (res.StatusCode === 401) {
          Notification.ShowError(res.Message);
        } else if (res.StatusCode === 200) {
          // Cookies.set('userToken', data.Token);
        }
      })
      .catch((error) => {
        console.log(2, error);
      });
    // }
  };
  return (
    <div className="container vh-100 d-flex justify-content-center">
      <div className=" d-flex justify-content-center align-items-center">
        <Form onFinish={HandleSubmit}>
          <Form.Item
            label="Username"
            name={'Username'}
            rules={[
              {
                required: true,
                type: "username",
                message: "Please enter a valid username",
              },
            ]}
          >
            <Input name="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={'Password'}
            rules={[
              {
                required: true,
                type: "password",
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password name="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
