import React, { useState } from "react";
// import { LoginOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const doLogin = (e) => {
    e.preventDefault();
    if (username != null && password != null) {
      var data = {
        Username: username,
        Password: password,
      };

      console.log(data);

      fetch(`https://localhost:7266/api/Login`, {
        method: 'POST',
        //   mode: "no-cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(1,data);
        })
        .catch((error) => {
          console.log(2,error);
        });
    }
  };
  const handleUsernameInput = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  return (
    <div className="container vh-100 d-flex justify-content-center">
      <div className=" d-flex justify-content-center align-items-center">
        <Form>
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
            <Input value={username} name="Username" onChange={handleUsernameInput} />
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
            <Input.Password value={password} name="Password" onChange={handlePasswordInput} />
          </Form.Item>
          <Button type="primary" onClick={doLogin}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
