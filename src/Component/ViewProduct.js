import { Card } from 'antd'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import ProductDetailDrawer from './Drawer/ProductDetailDrawer';
import { connect } from 'react-redux';
import { NumericFormat } from 'react-number-format';
function ViewProduct(props) {
  const { Data, Currency } = props;
  const [DrawerShow, setDrawerShow] = useState(false);
  const navigation = useNavigate();
  const HandleView = () => {
    navigation(`/product/${Data.Name.replace(/ /g, '-')}`, {
      state: {
        Data: Data
      }
    });
  }
  return (
    <Card className='border-0'
      cover={
        <div onClick={HandleView} className='M-Image-Container' role='button' aria-label={Data.Name}>
          <LazyLoadImage
            alt='Product-Image'
            width={"100%"}
            className='M-Show-Image'
            effect="blur"
            src={Data.Image[0]} />
          <div className='M-Image-Hover-Botton-Container'>
            <Button
              className='M-Image-Hover-Botton'
              onClick={(event) => {
                event.stopPropagation();
                setDrawerShow(true);
              }} >ADD</Button>
          </div>
        </div>
      }
    >
      <Card.Meta
        className='text-start'
        title={
          <p className='m-0' role='button' onClick={HandleView}>{Data.Name}</p>
        }
        description={
          <div>
            <div>
              <p className='M-Delete-Text m-0'>
                <NumericFormat value={(Data.Price * Currency.Multiple).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={Currency.Symbol} />
              </p>
            </div>
            <div className='mt-1'>
              <p className='m-0'>
                <strong>
                  <NumericFormat value={((Data.Price - Data.Price * Data.Discount / 100) * Currency.Multiple).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={Currency.Symbol} />
                </strong>
              </p>
            </div>
          </div>
        }>
      </Card.Meta>
      <ProductDetailDrawer Show={DrawerShow} Data={Data} onClose={() => setDrawerShow(false)} />
    </Card>
  )
}

const mapStateToProps = (state) => ({
  Currency: {
    Multiple: state.MoneyReducer.Multiple,
    Name: state.MoneyReducer.Name,
    Symbol: state.MoneyReducer.Symbol
  }
})

export default connect(mapStateToProps)(ViewProduct);
