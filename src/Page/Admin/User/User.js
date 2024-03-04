import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

export default function User() {
  const navigation = useNavigate();

  const HandleAdd = () => {
    navigation('/Admin/User-Form');
  }
  return (
    <div>
      <h3>
        User
      </h3>
      <div>
        <Button onClick={HandleAdd}>ADD</Button>
      </div>
    </div>
  )
}
