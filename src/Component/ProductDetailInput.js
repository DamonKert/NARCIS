import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, InputNumber, Row, Typography } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductDetailInput(props) {
    const { NotDrawer, Data, Size, setSize, setQuantity, Quantity } = props;
    const navigation = useNavigate();
    const HandleAddCart = () => {
        setQuantity(0);
        setSize({});
        if (Quantity !== 0) {
            props.dispatch({
                type: "ADD-CART",
                payload: {
                    ...Data,
                    Detail: {
                        Quantity: Quantity,
                        Size: Size
                    }
                }
            })
            if (props.onClose !== undefined) {
                props.onClose();
            }
            // props.dispatch({
            //     type: "CLOSE",
            //     payload: {
            //         Show: false,
            //     }
            // })
            if (NotDrawer === true) {
                navigation(`/`);
            }
        } else {
            alert("Please provide Size");
        }
    }

    return (
        <>
            <Row gutter={[0, 20]}>
                <Col span={24}>
                    <Row>
                        <Col xs={24} lg={4}>
                            Size
                        </Col>
                        <Col lg={19} xs={24} className='d-flex gap-2 mt-3 mt-lg-0'>
                            {Data.size.map((item, index) => {
                                return <div key={index}
                                    role='button'
                                    onClick={() => {
                                        setSize(item);
                                        setQuantity(1);
                                    }} style={{ border: '1px solid', borderColor: (Size.Name === item.Name ? "black" : "lightgrey"), width: 40, height: 25 }} className='d-flex justify-content-center align-items-center'>
                                    <div>{item.Name}</div>
                                </div>
                            })}
                        </Col>
                        <Col lg={4}>
                        </Col>
                        <Col xs={24} lg={19} className='mt-2'>
                            <Typography.Text>[Required] Please select an option</Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col xs={24} lg={4}>
                            Quantity
                        </Col>
                        <Col xs={24} lg={20} className='d-flex mt-3 mt-lg-0'>
                            <div role='button' onClick={() => { if (Quantity > 1) setQuantity(pre => pre - 1) }} className='h-100 d-flex justify-content-center align-items-center' style={{ width: 30, border: '1px solid', borderColor: 'lightgrey' }}>
                                <MinusOutlined />
                            </div>
                            <div className='h-100 d-flex justify-content-center align-items-center' style={{ width: 100, border: '1px solid', borderColor: 'lightgrey', borderLeft: 0, borderRight: 0 }}>
                                <InputNumber className='border-0' max={Size.Quantity}
                                    value={Quantity}
                                    onChange={(text) => {
                                        if (text >= 1 && text <= Size.quantity) {
                                            setQuantity(text);
                                        }
                                    }} />
                            </div>
                            <div role='button' onClick={() => {
                                if (Size.quantity > Quantity) { setQuantity(Quantity + 1); }
                            }} className='h-100 d-flex justify-content-center align-items-center' style={{ width: 30, border: '1px solid', borderColor: 'lightgrey' }}>
                                <PlusOutlined />
                            </div>
                        </Col>
                        <Col span={19} className='mt-2'>
                            <Typography.Text>(Minimum order quantity of 1 or {Size.quantity || 'more'} )</Typography.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider style={{ border: '1px solid', borderColor: "lightgrey" }} />
            <div className='d-flex justify-content-between '>
                <div className='M-Total-Font-Size M-Font-Color'>
                    TOTAL <span className='d-block d-sm-none'></span>(QUANTITY)
                </div>
                <div className='d-flex align-items-center'>
                    <Typography.Title level={3}>
                        {Size.Name === undefined ? "0" : (Data.Price - (Data.Price * Data.Discount / 100)) * Quantity}$
                    </Typography.Title>
                    <span>
                        ({Quantity} items)
                    </span>
                </div>
            </div>
            <div className='d-flex gap-3 mt-3'>
                <Button style={{ height: 60, borderRadius: 0 }} className='w-50 bg-dark text-white border-0'>
                    BUY IT NOW
                </Button>
                <Button style={{ height: 60, borderRadius: 0 }} className='w-50' onClick={HandleAddCart}>
                    CART
                </Button>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(null, mapDispatchToProps)(ProductDetailInput);