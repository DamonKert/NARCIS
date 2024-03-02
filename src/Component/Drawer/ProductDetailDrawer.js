import { Drawer, Image, Typography } from 'antd'
import React, { useState } from 'react'
import ProductDetailInput from '../ProductDetailInput';

function ProductDetailDrawer(props) {
    const [Size, setSize] = useState({});
    const [Quantity, setQuantity] = useState(0);
    const { Show, Data, onClose } = props;
    const HandleClose = () => {
        onClose();
    }
    if (Data.Title === undefined) {
        return <></>
    }

    return (
        <Drawer closable open={Show} onClose={HandleClose}>
            <Typography.Title level={4}>
                Select option
            </Typography.Title>
            <div>
                <Image className='M-Aspect object-fit-contain' src={Data.Image[0]} ></Image>
            </div>
            <Typography.Title level={4} className='mt-3'>
                {Data.Title}
            </Typography.Title>
            <ProductDetailInput onClose={onClose} Data={Data} Size={Size} setSize={setSize} Quantity={Quantity} setQuantity={setQuantity} />
        </Drawer>
    )
}


export default ProductDetailDrawer;