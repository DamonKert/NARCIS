import { Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { API } from '../../../API/API';
import { GET_CATEGORIES } from '../../../API/URL';
import { GetRequired } from '../../../Asset/Validated/Validated';

export default function CategoriesSelect({ Name }) {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        API.GET(GET_CATEGORIES)
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    const Temp = [];
                    res.Data.forEach(item => {
                        Temp.push({
                            label: item.Name,
                            value: item.Id + "/" + item.Name
                        });
                    })
                    setData([...Temp])
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <Form.Item label="Category" name={Name} rules={[{
            ...GetRequired("Category")
        }]}>
            <Select loading={Loading} showSearch autoClearSearchValue placeholder='Category' options={Data} />
        </Form.Item>
    )
}
