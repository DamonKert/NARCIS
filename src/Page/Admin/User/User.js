import { Button, Input, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API } from '../../../API/API';
import { DELETE_USER_BY_ID, GET_USER } from '../../../API/URL';
import { EditOutlined } from '@ant-design/icons';
import DeletePopover from '../../../Component/Admin/Popover/DeletePopover';
import { Notification } from '../../../Asset/ShowNotification';

export default function User() {
  const [dataSource, setdataSource] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Search, setSearch] = useState("");
  const navigation = useNavigate();

  const HandleAdd = () => {
    navigation('/Admin/User-Form');
  }

  const HandleEdit = (record) => {
    navigation(`/Admin/User-Edit/${record.Id}`);
  }

  const HandleDelete = (record) => {
    API.DELETE(DELETE_USER_BY_ID(record.Id))
      .then(res => {
        if (res.StatusCode === 200) {
          Notification.ShowSuccess("Success", res.Message);
          GetData();
        } else {
          Notification.ShowError("Error", res.Message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const GetData = () => {
    setLoading(true);
    API.GET(GET_USER)
      .then(res => {
        setLoading(false);
        res.Data.forEach((_, index) => {
          res.Data[index].key = res.Data[index].Id;
        })
        setdataSource([...res.Data]);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
  }

  useEffect(() => {
    API.GET(GET_USER)
      .then(res => {
        setLoading(false);
        res.Data.forEach((_, index) => {
          res.Data[index].key = res.Data[index].Id;
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
        User
      </h3>
      <div className='mt-4 d-flex justify-content-between'>
        <Input.Search placeholder='Search by Username' className='M-Input-Tool'
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
            emptyText: <h1>No User Found</h1>,
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
              title: "Username",
              className: "text-center",
              dataIndex: "Username",
              filteredValue: [Search],
              onFilter: (value, record) => {
                return String(record.Username).toLowerCase().includes(value.toLowerCase());
              }
            }, {
              title: "PhoneNumber",
              className: "text-center",
              dataIndex: "PhoneNumber"
            }, {
              title: "Email",
              className: "text-center",
              dataIndex: "Email"
            }, {
              title: "Telegram ID",
              className: "text-center",
              dataIndex: "ChatId"
            },
            {
              title: "Action",
              className: "text-center",
              dataIndex: "action",
              render: (_, record) => <span className='d-flex justify-content-around'>
                <EditOutlined className='text-primary' style={{ fontSize: 20 }} onClick={() => { HandleEdit(record) }} />
                <DeletePopover HandleDelete={() => HandleDelete(record)} />
              </span>
            }
          ]} />
      </div>
    </Spin>
  )
}
