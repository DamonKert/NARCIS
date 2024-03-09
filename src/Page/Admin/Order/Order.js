import { Button, Input } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const [Search, setSearch] = useState("");
  const navigation = useNavigate();
  const HandleAdd = () => {
    navigation('/Admin/Order-Form');
  }
  return (
    <div>
      <div>
        <h3>
          Order
        </h3>
      </div>
      <div className='mt-4 d-flex justify-content-between'>
        <Input.Search placeholder='Name EN' className='M-Input-Tool'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onSearch={(text) => {
            setSearch(text)
          }} />
        <Button onClick={HandleAdd}>ADD</Button>
      </div>
    </div>
  )
}
