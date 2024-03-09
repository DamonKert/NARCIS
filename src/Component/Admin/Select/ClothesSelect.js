import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { API } from '../../../API/API';
import { GET_CLOTHES } from '../../../API/URL';

export default function ClothesSelect() {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        API.GET(GET_CLOTHES)
            .then(res => {
                setLoading(false);
                console.log(res);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [])
    return (
        <Select options={Data} placeholder="Clothes" showSearch autoClearSearchValue allowClear loading={Loading}></Select>
    )
}
