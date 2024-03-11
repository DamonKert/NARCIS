import { Form, Select } from 'antd'
import React, { useState } from 'react'
import { GetRequired } from '../../../Asset/Validated/Validated';

export default function SizesSelect({ mode,Name }) {
    const [Sizes, setSizes] = useState([{
        value: 1 + "/XS",
        label: "XS"
    },
    {
        value: 2 + "/S",
        label: "S"
    },
    {
        value: 3 + "/M",
        label: "M"
    },
    {
        value: 4 + "/L",
        label: "L"
    },
    {
        value: 5 + "/XL",
        label: "XL"
    },
    {
        value: 6 + "/XXL",
        label: "XXL"
    }]);


    return (
        <Form.Item label="Sizes" name={Name} rules={[{
            ...GetRequired("Sizes")
        }]}>
            <Select options={Sizes} placeholder="Sizes" mode={mode}
                showSearch autoClearSearchValue
                allowClear />
        </Form.Item>
    )
}
