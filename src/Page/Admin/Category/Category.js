import { Button, Input, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API } from '../../../API/API';
import { DELETE_CATEGORIES_BY_ID, GET_CATEGORIES } from '../../../API/URL';
import { EditOutlined } from '@ant-design/icons';
import DeletePopover from '../../../Component/Admin/Popover/DeletePopover';
import { Notification } from '../../../Asset/ShowNotification';

export default function Category() {
    const [Loading, setLoading] = useState(true);
    const [dataSource, setdataSource] = useState([]);
    const [Search, setSearch] = useState("");
    const navigation = useNavigate();
    const HandleAdd = () => {
        navigation('/Admin/Category-Form');
    }
    const HandleEdit = (record) => {
        navigation(`/Admin/Category-Edit/${record.Id}`);
    }
    const HandleDelete = (record) => {
        setLoading(true);
        API.DELETE(DELETE_CATEGORIES_BY_ID(record.Id))
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    Notification.ShowSuccess("Success", res.Message);
                    GetData();
                } else {
                    Notification.ShowError("Error 404", res.Message);
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }
    const GetData = () => {
        setLoading(true);
        API.GET(GET_CATEGORIES)
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    res.Data.forEach((_, index) => {
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
    useEffect(() => {
        API.GET(GET_CATEGORIES)
            .then(res => {
                setLoading(false);
                if (res.StatusCode === 200) {
                    res.Data.forEach((_, index) => {
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
    return (
        <Spin spinning={Loading}>
            <h3>
                Category
            </h3>
            <div className='mt-4 d-flex justify-content-between'>
                <Input.Search placeholder='Name' className='M-Input-Tool'
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
                        emptyText: <h1>No Category Found</h1>,
                    }}
                    className='M-Overflow-Table'
                    dataSource={dataSource}
                    columns={[
                        {
                            title: "Id",
                            className: 'text-center',
                            dataIndex: "Id",
                        },
                        {
                            dataIndex: 'Name',
                            className: "text-center",
                            title: "Name",
                            filteredValue: [Search],
                            onFilter: (value, record) => {
                                return String(record.Name).toLowerCase().includes(value.toLowerCase());
                            }
                        },
                        {
                            dataIndex: "Parent",
                            className: "text-center",
                            title: "Parent",
                            render: (_, record) => {
                                if (record.Parent === null) {
                                    return "None";
                                } else {
                                    return record.Parent.Name
                                }
                            }
                        },
                        {
                            title: "Action",
                            className: "text-center w-25",
                            dataIndex: "action",
                            render: (_, record) => <span className='d-flex justify-content-around'>
                                <EditOutlined className='text-primary' style={{ fontSize: 20 }} onClick={() => { HandleEdit(record) }} />
                                <DeletePopover HandleDelete={() => HandleDelete(record)} />
                            </span>
                        }]}
                />
            </div>
        </Spin>
    )
}
