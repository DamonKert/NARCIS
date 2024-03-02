import { Col, Divider, Row, Typography } from 'antd';
import React from 'react'
import { connect } from 'react-redux';

function TotalPriceView(props) {
    const { Data } = props;
    const Total = Data.reduce((accumulator, currentValue) => {
        const temp = currentValue.Detail.Quantity * (currentValue.Price - (currentValue.Price * currentValue.Discount / 100));
        return temp + accumulator;
    }, 0);
    return (
        <div className='p-4' style={{ border: '1px solid black' }}>
            <Row>
                <Col span={14}>
                    Total product amount
                </Col>
                <Col span={10} className='text-end'>
                    {Total}$
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col span={14}>
                    total shipping cost
                </Col>
                <Col span={10} className='text-end'>
                    0$
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={14}>
                    <Typography.Title level={4}>
                        Expected payment amount
                    </Typography.Title>
                </Col>
                <Col span={10} className='text-end'>
                    <Typography.Title level={4}>
                        {Total}$
                    </Typography.Title>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Data: state.CartReducer.Data
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TotalPriceView);
