import { Button, Input, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API } from '../../../API/API';
import { GET_MODEL } from '../../../API/URL';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function Model() {
    const [Search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataSource, setdataSource] = useState([]);
    const navigation = useNavigate();
    const HandleAdd = () => {
        navigation(`/Admin/Model-Form`);
    }

    const HandleEdit = (record) => {
        navigation(`/Admin/Model-edit/${record.Id}`);
    }
    useEffect(() => {
        setLoading(true);
        API.GET(GET_MODEL)
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    res.Data.forEach((_, index) => {
                        res.Data[index].key = res.Data[index].Id;
                    })
                    setdataSource([...res.Data]);
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, [])
    return (
        <Spin spinning={loading}>
            <h3>
                Model
            </h3>
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
            <div className='mt-4'>
                <Table
                    locale={{
                        emptyText: <h1>No Model Found</h1>,
                    }}
                    dataSource={dataSource}
                    className='M-Remove-Padding-Table'
                    columns={[{
                        title: "Profile",
                        className: "text-center",
                        dataIndex: "ProfilePicture",
                        render: (_, item) => <div className='d-flex justify-content-center'>
                            <LazyLoadImage effect='blur' src={item.ProfilePicture} width={"100px"} height={"100px"} className='object-fit-cover' />
                        </div>
                    }, {
                        title: "Name",
                        className: "text-center",
                        dataIndex: "Name",
                        filteredValue: [Search],
                        onFilter: (value, record) => {
                            return String(record.Name).toLowerCase().includes(value.toLowerCase());
                        }
                    }, {
                        title: "Height",
                        className: "text-center",
                        dataIndex: "Height",
                        render: (_, record) => record.Height + 'cm'
                    }, {
                        title: "Weight",
                        className: "text-center",
                        dataIndex: "Weight",
                        render: (_, record) => record.Weight + 'kg'
                    },
                    {
                        title: "Top",
                        className: "text-center",
                        dataIndex: "Top"
                    }, {
                        title: "Bottom",
                        className: "text-center",
                        dataIndex: "Bottom"
                    },
                    {
                        title: "Action",
                        className: "text-center",
                        dataIndex: "action",
                        render: (_, record) => <span className='d-flex justify-content-around'>
                            <EditOutlined className='text-primary' style={{ fontSize: 20 }} onClick={() => { HandleEdit(record) }} />
                            <DeleteOutlined className='text-danger' style={{ fontSize: 20 }} />
                        </span>
                    }

                    ]} />
            </div>
        </Spin>
    )
}
