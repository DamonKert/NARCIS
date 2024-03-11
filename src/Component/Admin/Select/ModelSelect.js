import React, { useEffect, useState } from 'react'
import { API } from '../../../API/API';
import { GET_MODEL } from '../../../API/URL';
import { Form, Select } from 'antd';
import { GetRequired } from '../../../Asset/Validated/Validated';

export default function ModelSelect({Name}) {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        API.GET(GET_MODEL)
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    const Temp = [];
                    res.Data.forEach(item => {
                        Temp.push({
                            label: item.Name,
                            value: item.Id + '/' + item.Name
                        })
                    });
                    setData([...Temp]);
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, [])
    return (
        <Form.Item label="Model" name={Name} rules={[{
            ...GetRequired("Model")
        }]}>
            <Select loading={Loading} showSearch autoClearSearchValue placeholder='Model' options={Data} />
        </Form.Item>
    )
}
