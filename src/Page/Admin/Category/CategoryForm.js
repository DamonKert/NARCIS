import { Button, Form, Input, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap'
import { GetRequired } from '../../../Asset/Validated/Validated';
import { API } from '../../../API/API';
import { CREATE_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_BY_ID, UPDATE_CATEGORIES } from '../../../API/URL';
import { Notification } from '../../../Asset/ShowNotification';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CategoryForm() {
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(true);
  const [ParentCategory, setParentCategory] = useState([]);
  const [SaveData, setSaveData] = useState({});
  const navigation = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const IsUpdate = pathname.toLocaleLowerCase().includes('edit');
  useEffect(() => {
    const GetCate = async () => API.GET(GET_CATEGORIES)
      .then(res => {
        setLoading(false);
        if (res.StatusCode === 200) {
          const TempData = [];
          res.Data.forEach((item, index) => {
            if (item.Parent === null) {
              TempData.push({
                key: item.Id,
                value: item.Id + '/' + item.Name,
                label: item.Name
              });
            }
          })
          setParentCategory([...TempData]);
        } else {
          Notification.ShowError("Error 404", res.Message);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
    if (IsUpdate) {
      API.GET(GET_CATEGORIES_BY_ID(pathname.split('/')[3]))
        .then(res => {
          if (res.StatusCode === 200) {
            form.setFieldValue('Name', res.Data.Name);
            if (res.Data.Parent !== null) {
              form.setFieldValue('ParentId', res.Data.Parent.Id + "/" + res.Data.Parent.Name);
            }
            setSaveData({
              Name: res.Data.Name,
              ParentId: "" + res.Data.Parent.Id
            });
          } else if (res.StatusCode === 404) {
            Notification.ShowError('Error 404', res.Message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(GetCate);
    } else {
      GetCate();
    }

  }, [IsUpdate, pathname, form])

  const HandleSubmit = (Data) => {
    setLoading(true);
    if (Data.ParentId === undefined) {
      Data.ParentId = 0;
    } else {
      Data.ParentId = Data.ParentId.split('/')[0];
    }
    if (IsUpdate) {
      var Check = false;
      Object.keys(Data).forEach(key => {
        if (Data[key] !== SaveData[key]) {
          Check = true;
        }
      })
      if (Check === true) {
        Data.ID = pathname.split('/')[3];
        API.POST(UPDATE_CATEGORIES(Data.ID), Data)
          .then(res => {
            setLoading(false);
            if (res.StatusCode === 200) {
              Notification.ShowSuccess("Success", res.Message);
              navigation(`/Admin/Category`);
            } else {
              Notification.ShowError("Error", res.Message);
            }
          })
          .catch(err => {
            setLoading(false);
            console.log(err);
          });
      } else {
        Notification.ShowSuccess('Success', "Nothing has been changed");
        navigation(`/Admin/Category`);
      }
    } else {
      API.POST(CREATE_CATEGORIES, Data)
        .then(res => {
          setLoading(false);
          if (res.StatusCode === 200) {
            Notification.ShowSuccess("Success", res.Message);
            navigation('/Admin/Category');
          } else {
            Notification.ShowError("Error 404", res.Message);
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  }
  return (
    <Spin spinning={Loading}>
      <Form form={form} layout='vertical' onFinish={HandleSubmit}>
        <Card className='border-0'>
          <CardHeader className='border-0 bg-white'>
            <h1>{IsUpdate ? 'Edit Category information' : 'Category Form'}</h1>
          </CardHeader>
          <CardBody>
            <Form.Item name={"Name"} label="Name" rules={[GetRequired("Name")]}>
              < Input placeholder='Name' />
            </Form.Item>
            <Form.Item name={"ParentId"} label="Parent">
              <Select allowClear showSearch placeholder="Parent" options={ParentCategory}></Select>
            </Form.Item>
          </CardBody>
          <CardFooter className='border-0 bg-white d-flex justify-content-center'>
            <Button htmlType='submit'>SUBMIT</Button>
          </CardFooter>
        </Card>
      </Form >
    </Spin>
  )
}
