import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

export default function Cloth() {
    const navigation = useNavigate();
    const HandleAdd = () => {
        navigation(`/Admin/Cloth-Form`);
    }
    return (
        <div>
            <h3>
                Cloth
            </h3>
            <Button onClick={HandleAdd}>ADD</Button>
        </div>
    )
}
