import { EditOutlined } from '@ant-design/icons';
import { Input, Select, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { API } from '../../../API/API';
import { GET_PROVINCE } from '../../../API/URL';
import ProvinceModal from '../../../Component/Admin/Modal/ProvinceModal';

export default function Province() {
    const [ShowEditModal, setShowEditModal] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [UpdateData, setUpdateData] = useState({});
    const [dataSource, setdataSource] = useState([]);
    const [Search, setSearch] = useState("");
    useEffect(() => {
        setLoading(true);
        API.GET(GET_PROVINCE)
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    res.Data.forEach((item, index) => {
                        res.Data[index].key = res.Data[index].Id;
                    })
                    setdataSource([...res.Data])
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, [])

    const GetData = () => {
        setLoading(true);
        API.GET(GET_PROVINCE)
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    res.Data.forEach((item, index) => {
                        res.Data[index].key = res.Data[index].Id;
                    })
                    setdataSource([...res.Data])
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }
    return (
        <Spin spinning={Loading}>
            <div>
                <h3>
                    Province
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
            </div>
            <div className='mt-4'>
                <Table
                    locale={{
                        emptyText: <h1>No Province Found</h1>,
                    }}
                    columns={[
                        // {
                        //     title: "",
                        //     className: 'text-center',
                        //     render: (Temp_Data, temp, index) => {
                        //         return <div key={temp.Id}>{index + 1}</div>
                        //     }
                        // },
                        {
                            title: "Id",
                            className: 'text-center',
                            dataIndex: "Id",
                        },
                        {
                            title: "Name KH",
                            className: 'text-center',
                            dataIndex: "Name_kh",
                            key: "Name_kh",
                        }, {
                            title: "Name EN",
                            className: 'text-center',
                            dataIndex: "Name_en",
                            key: "Name_en",
                            filteredValue: [Search],
                            onFilter: (value, record) => {
                                return String(record.Name_en).toLowerCase().includes(value.toLowerCase());
                            }
                        }, {
                            title: "Delivery Fee",
                            className: 'text-center',
                            dataIndex: "DeliveryFee",
                            key: "DeliveryFee"
                        }, {
                            title: "Action",
                            dataIndex: "Action",
                            className: "text-center",
                            key: "Action",
                            render: (_, record) => {
                                return <div key={record.Id} ><EditOutlined className='text-primary' style={{ fontSize: 20 }}
                                    onClick={() => {
                                        setShowEditModal(true);
                                        setUpdateData(record);
                                    }} /></div>
                            }
                        }]} dataSource={dataSource} />
            </div>
            <ProvinceModal GetData={GetData} Show={ShowEditModal} OnClose={() => setShowEditModal(false)} Data={UpdateData} setData={setUpdateData} />
        </Spin>
    )
}
