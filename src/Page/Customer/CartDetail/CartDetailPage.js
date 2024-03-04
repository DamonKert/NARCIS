import { Breadcrumb, Steps, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import CartDetail from './CartDetail';
// import CustomerInfo from './CustomerInfo';
// import OrderCompleted from './OrderCompleted';

function CartDetailPage(props) {
    const navigation = useNavigate();
    const location = useLocation();
    const temp = {
        cart: 0,
        profile: 1,
        completed: 2
    };
    const [current, setcurrent] = useState(temp[location.pathname.split('/')[2]]);
    const onChange = (value) => {
        setcurrent(value);
        if (value === 0) {
            navigation('/order/cart');
        } else if (value === 1) {
            navigation('/order/profile');
        } else if (value === 2) {
            navigation('/order/completed');
        }
    }

    return (
        <Container>
            <div className='d-flex justify-content-end'>
                <Breadcrumb
                    items={[{
                        title: <Link to={'/'} style={{ textDecoration: 'none' }}>Home</Link>,
                    }, {
                        title: <Typography.Text strong>Shopping Busket</Typography.Text>,
                    }]}></Breadcrumb>
            </div>

            <div>
                <Typography.Title level={2} className='fw-bold text-center'>
                    Shopping Busket
                </Typography.Title>
            </div>
            <div className='mt-5'>
                <Steps
                    type="navigation"
                    current={current}
                    onChange={onChange}
                    className="site-navigation-steps"
                    items={[
                        {
                            status: current === 0 ? 'process' : 'wait',
                            title: 'Shopping Cart',
                        },
                        {
                            status: current === 1 ? 'process' : 'wait',
                            title: 'Fill out the order form',
                        },
                        {
                            status: current === 2 ? 'process' : 'wait',
                            title: 'Order completed',
                        },
                    ]}
                />
            </div>
            <div className='mt-5 mb-5'>
                <Outlet />
                {/* {current === 0 &&
                    <CartDetail />}
                {
                    current === 1 &&
                    <CustomerInfo />
                }
                {
                    current === 2 &&
                    <OrderCompleted />
                } */}
            </div>
        </Container>
    )
}


const mapStateToProps = (state) => ({
    Data: state.CartReducer.Data
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CartDetailPage);