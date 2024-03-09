import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { API } from '../../../API/API'
import { GET_PROVINCE } from '../../../API/URL'

export default function ProvincesSelect() {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        API.GET(GET_PROVINCE)
            .then(res => {
                setLoading(false);
                const Temp = [];
                if (res.StatusCode === 200) {
                    res.Data.forEach(item => {
                        Temp.push({
                            value: item.Id + "/" + item.Name_en,
                            label: item.Name_en
                        });
                    })
                    setData([...Temp]);
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [])
    return (
        <Select options={Data} autoClearSearchValue allowClear showSearch placeholder="Provinces" loading={Loading}>
        </Select>
    )
}
