import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

export default function Model() {
    const navigation = useNavigate();
    const HandleAdd = () => {
        navigation(`/Admin/Model-Form`);
    }
    return (
        <div>
            <h3>
                Model
            </h3>
            <div>
                <Button onClick={HandleAdd}>ADD</Button>
            </div>
        </div>
    )
}
