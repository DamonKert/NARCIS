import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, List, Typography } from 'antd'
import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NumericFormat } from 'react-number-format';
import { connect } from 'react-redux';

function RecentlyPage(props) {
    const { Currency } = props;
    const [Data, setData] = useState([{
        Name: "single button blazer wrap dress",
        Price: 2000,
        Discount: 20,
        Images: "https://www.narcis.co.kr/web/product/medium/202308/6b35afbfca1e5367fa27b88349cbe4de.jpg"
    }, {
        Name: "single button blazer wrap dress",
        Price: 2000,
        Discount: 20,
        Images: "https://www.narcis.co.kr/web/product/medium/202308/6b35afbfca1e5367fa27b88349cbe4de.jpg"
    }, {
        Name: "single button blazer wrap dress",
        Price: 2000,
        Discount: 20,
        Images: "https://www.narcis.co.kr/web/product/medium/202308/6b35afbfca1e5367fa27b88349cbe4de.jpg"
    }]);
    return (
        <div className='M-Container-Detail'>
            <div className='mt-5'>
                <h5>Recently viewed products</h5>
                <Divider className='border-4 border-dark' />
            </div>
            <div>
                <List dataSource={Data} renderItem={(item) => {
                    return <div className='position-relative'>
                        <div className='d-flex w-100'>
                            <LazyLoadImage src={item.Images} width={"100px"} height={"100px"} className='object-fit-cover' />
                            <div className='ms-3 d-flex flex-column align-items-around w-100'>
                                <div>
                                    {item.Name}
                                </div>
                                <Typography.Text delete>
                                    <NumericFormat value={(item.Price * Currency.Multiple).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={Currency.Symbol} />
                                </Typography.Text>
                                <div>
                                    <NumericFormat value={((item.Price - (item.Price * item.Discount / 100)) * Currency.Multiple).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={Currency.Symbol} />
                                </div>
                                <div className='d-flex justify-content-end w-100'>
                                    <Button className='rounded-0 bg-dark text-white'>Place an order</Button>
                                </div>
                            </div>
                            <div className='M-Recently-Delete-Icon'>
                                <CloseOutlined />
                            </div>
                        </div>
                        <Divider />
                    </div>
                }} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Currency: {
        Multiple: state.MoneyReducer.Multiple,
        Name: state.MoneyReducer.Name,
        Symbol: state.MoneyReducer.Symbol
    }
})


export default connect(mapStateToProps)(RecentlyPage);