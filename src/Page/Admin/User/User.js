import { Button, Input, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { API } from '../../../API/API';
import { GET_USER } from '../../../API/URL';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function User() {
  const [dataSource, setdataSource] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Search, setSearch] = useState("");
  const navigation = useNavigate();

  const HandleAdd = () => {
    navigation('/Admin/User-Form');
  }

  const HandleEdit = (record) => {
    navigation(`/Admin/User-Edit/${record.Id}`);
  }

  useEffect(() => {
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
          dataSource={dataSource}
          columns={[
            {
              title: "",
              className: "text-center",
              dataIndex: "",
              render: (_, record, index) => index + 1
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
            // {
            //   title: "Role",
            //   className: "text-center",
            //   dataIndex: "Role"
            // },
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
