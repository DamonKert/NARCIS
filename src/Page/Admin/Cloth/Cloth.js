import { Button, Input, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API } from '../../../API/API';
import { DELETE_CLOTHES_BY_ID, GET_CLOTHES } from '../../../API/URL';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import DeletePopover from '../../../Component/Admin/Popover/DeletePopover';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ClothDetailModal from '../../../Component/Admin/Modal/ClothDetailModal';
import { Notification } from '../../../Asset/ShowNotification';

export default function Cloth() {
    const [dataSource, setdataSource] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [ModalViewData, setModalViewData] = useState({});
    const [ShowModalView, setShowModalView] = useState(false);
    const [Search, setSearch] = useState("");
    const navigation = useNavigate();
    const HandleAdd = () => {
        navigation(`/Admin/Cloth-Form`);
    }
    const HandleEdit = (record) => {
        navigation(`/Admin/Cloth-Edit/${record.Id}`);
    }
    const HandleViewData = (record) => {
        setModalViewData({ ...record });
        setShowModalView(true);
    }
    const HandleDelete = (record) => {
        setLoading(true);
        API.DELETE(DELETE_CLOTHES_BY_ID(record.Id))
            .then(res => {
                if (res.StatusCode === 404) {
                    setLoading(false);
                    Notification.ShowError("Error " + res.StatusCode, res.Message);
                } else if (res.StatusCode === 200) {
                    Notification.ShowSuccess("Success", res.Message);
                    GetData();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const GetData = () => {
        API.GET(GET_CLOTHES)
            .then(res => {
                setLoading(false);
                res.Data.forEach((item, index) => {
                    res.Data[index].key = item.Id;
                    res.Data[index].Thumbnail = item.ImagePaths[0];
                })
                setdataSource([...res.Data]);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        API.GET(GET_CLOTHES)
            .then(res => {
                setLoading(false);
                res.Data.forEach((item, index) => {
                    res.Data[index].key = item.Id;
                    res.Data[index].Thumbnail = item.ImagePaths[0];
                })
                setdataSource([...res.Data]);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [])
    return (
        <Spin spinning={Loading}>
            <h3>
                Cloth
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
                        emptyText: <h1>No Cloth Found</h1>,
                    }}
                    className='M-Overflow-Table'
                    dataSource={dataSource}
                    columns={[{
                        title: "Image",
                        className: "text-center",
                        dataIndex: "Thumbnail",
                        render: (_, record) => <div className='d-flex justify-content-center'>
                            <LazyLoadImage effect='blur' src={record.Thumbnail} width={"100px"} height={"100px"} className='object-fit-cover' />
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
                        title: "Price",
                        className: "text-center",
                        dataIndex: "Price"
                    }, {
                        title: "Discount",
                        className: "text-center",
                        dataIndex: "Discount"
                    }, {
                        title: "Action",
                        className: "text-center",
                        dataIndex: "Action",
                        render: (_, record) => <span className='d-flex justify-content-around'>
                            <EditOutlined className='text-primary' style={{ fontSize: 20 }} onClick={() => { HandleEdit(record) }} />
                            <EyeOutlined className='text-success' style={{ fontSize: 20 }} onClick={() => { HandleViewData(record) }} />
                            <DeletePopover HandleDelete={() => HandleDelete(record)} />
                        </span>
                    }]}>
                </Table>
            </div>
            <ClothDetailModal Data={ModalViewData} setData={setModalViewData} OnClose={() => setShowModalView(false)} Show={ShowModalView} />
        </Spin>
    )
}
