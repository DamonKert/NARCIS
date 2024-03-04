import { EditOutlined } from '@ant-design/icons';
import { Table, Typography } from 'antd'
import React, { useState } from 'react'

export default function Province() {
    const [dataSource, setdataSource] = useState([{
        id: 1,
        Name_kh: "PhnomPhen",
        Name_en: "PhnomPhen",
        DeliveryFee: 12
    }]);
    return (
        <div>
            <h3>
                Province
            </h3>
            <div>

                <Table columns={[
                    {
                        title: "",
                        dataIndex: " ",
                        render: (Temp_Data, temp, index) => <div key={index}>{index + 1}</div>
                    },
                    {
                        title: "Name KH",
                        dataIndex: "Name_kh"
                    }, {
                        title: "Name EN",
                        dataIndex: "Name_en"
                    }, {
                        title: "Delivery Fee",
                        dataIndex: "DeliveryFee",
                    }, {
                        title: "Action",
                        dataIndex: "Action",
                        render: (item, temp, index) => {
                            return <EditOutlined key={index} className='text-primary' style={{ fontSize: 20 }} />
                        }
                    }]} dataSource={dataSource} />
            </div>
        </div>
    )
}
