import { Button, Col, Collapse, Divider, Image, InputNumber, List, Row, Typography } from 'antd';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import TotalPriceView from '../Component/TotalPriceView';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ChangeSizeModal from '../Component/Modal/ChangeSizeModal';


function CartDetail(props) {
    const { Data } = props;
    const [ChangeData, setChangeData] = useState(undefined);
    const [ModalChangeData, setModalChangeData] = useState(false);
    const HandleSave = (newData) => {
        props.dispatch({
            type: "UPDATE-DATA",
            payload: newData
        });
    }
    const HandleDelete = (DeleteData) => {
        props.dispatch({
            type: "DELETE-DATA",
            payload: DeleteData
        })
    }
    return (
        <div>
            <Row>
                <Col xs={24} lg={16}>
                    <Collapse
                        bordered={false}
                        items={[{
                            key: '1',
                            headerClass: "fw-bold",
                            label: 'shopping cart items',
                            children: <div className='p-3'>
                                <div className='p-3'>
                                    <Typography.Title level={5}>
                                        General products ({Data.length})
                                    </Typography.Title>
                                </div>
                                {
                                    Data.length !== 0 &&
                                    <div>
                                        <List
                                            renderItem={(item) => {
                                                return <div className='position-relative'>
                                                    <div>
                                                        <div className='d-flex gap-3'>
                                                            <Image className='M-Cart-Image-View' preview={false} src={item.Image[0]} />
                                                            <div>
                                                                <div>
                                                                    <Typography.Text>{item.Title}</Typography.Text>
                                                                </div>
                                                                <div>
                                                                    <Typography.Text>{item.Price - item.Price * item.Discount / 100} $</Typography.Text>
                                                                </div>
                                                                <div>
                                                                    <Typography.Text><span className='text-danger'>-0</span> $</Typography.Text>
                                                                </div>
                                                                <div>
                                                                    <Typography.Text>Shipping: [Free] / Basic shipping</Typography.Text>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mt-3 p-3'>
                                                            [Option: {item.Detail.Size.Name}]
                                                            <a href='#none' className='ms-3 M-Change-Size-Option-Link' onClick={() => {
                                                                setChangeData({ ...item });
                                                                setModalChangeData(true)
                                                            }}>
                                                                Change options
                                                            </a>
                                                        </div>
                                                        <Row className='mt-3'>
                                                            <Col span={10}>
                                                                <Typography.Text>Quantity</Typography.Text>
                                                            </Col>
                                                            <Col span={14} className='d-flex justify-content-end align-items-center'>
                                                                <div role='button' onClick={() => {
                                                                    if (item.Detail.Quantity > 1) {
                                                                        item.Detail.Quantity = item.Detail.Quantity - 1;
                                                                        props.dispatch({
                                                                            type: "UPDATE-DATA",
                                                                            payload: item
                                                                        })
                                                                    }
                                                                }} className='user-select-none h-100 d-flex justify-content-center align-items-center' style={{ width: 30, border: '1px solid', borderColor: 'lightgrey' }}>
                                                                    <MinusOutlined />
                                                                </div>
                                                                <div className='h-100 d-flex justify-content-center align-items-center' style={{ width: 100, border: '1px solid', borderColor: 'lightgrey', borderLeft: 0, borderRight: 0 }}>
                                                                    <InputNumber className='border-0' max={item.Detail.Size.quantity}
                                                                        value={item.Detail.Quantity}
                                                                        onChange={(value) => {
                                                                            if (value >= 1 && value <= item.Detail.Size.quantity) {
                                                                                item.Detail.Quantity = value;
                                                                                props.dispatch({
                                                                                    type: "UPDATE-DATA",
                                                                                    payload: item
                                                                                })
                                                                            }
                                                                        }} />
                                                                </div>
                                                                <div role='button' onClick={() => {
                                                                    if (item.Detail.Size.quantity > item.Detail.Quantity) {
                                                                        item.Detail.Quantity = item.Detail.Quantity + 1;
                                                                        props.dispatch({
                                                                            type: "UPDATE-DATA",
                                                                            payload: item
                                                                        })
                                                                    }
                                                                }} className='user-select-none h-100 d-flex justify-content-center align-items-center' style={{ width: 30, border: '1px solid', borderColor: 'lightgrey' }}>
                                                                    <PlusOutlined />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Divider />
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <Typography.Text>
                                                                    Order amount
                                                                </Typography.Text>
                                                            </div>
                                                            <div>
                                                                <span className='fw-bold'>
                                                                    {item.Detail.Quantity * (item.Price - item.Price * item.Discount / 100)}0
                                                                </span> $
                                                            </div>
                                                        </div>
                                                        <div className='d-flex gap-3 mt-3'>
                                                            <Button style={{ height: 50 }} block className='rounded-0'>Product of interest</Button>
                                                            <Button style={{ height: 50 }} block className='rounded-0'>Place an Order</Button>
                                                        </div>
                                                    </div>
                                                    <Divider />
                                                    <div className='top-0 position-absolute' style={{ right: 0 }}>
                                                        <CloseOutlined className='text-danger' onClick={() => HandleDelete(item)} />
                                                    </div>
                                                </div>
                                            }}
                                            dataSource={Data} />
                                    </div>
                                }
                            </div>
                        }]}
                    />
                </Col>
                <Col xs={24} lg={8}>
                    <TotalPriceView />
                    <div className='mt-3'>
                        <Button style={{ height: 50 }} block className='bg-dark text-white border-0 rounded-0'>Order all products</Button>
                    </div>
                    <div className='mt-3'>
                        <Button style={{ height: 50 }} block className='rounded-0'>Order selected product</Button>
                    </div>
                </Col>
            </Row>
            <ChangeSizeModal
                Show={ModalChangeData}
                HandleSave={HandleSave}
                OnClose={() => {
                    setModalChangeData(false);
                    setChangeData(undefined);
                }}
                Data={ChangeData} />
        </div>
    )
}


const mapStateToProps = (state) => ({
    Data: state.CartReducer.Data
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);