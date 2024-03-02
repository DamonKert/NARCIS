import { Card, Image } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SwiperViewProduct({ Data }) {
    const navigation = useNavigate();
    const HandleView = () => {
        navigation(`/product/${Data.Title.replace(/ /g, '-')}`, { state: { Data: Data } });
    }
    return (
        <Card className='border-0'
            cover={<Image onClick={HandleView}
                preview={{
                    visible: false,
                    maskClassName: "bg-transparent",
                    mask:
                        <Card.Meta
                            className='M-Swiper-View-Product p-4 text-start'
                            title={
                                <p className='m-0' role='button' onClick={HandleView}>{Data.Title}</p>
                            }
                            description={
                                <div>
                                    <div>
                                        <p className='M-Delete-Text m-0'>{Data.Price} $</p>
                                    </div>
                                    <div className='mt-1'>
                                        <p className='m-0'><strong>{Data.Price - Data.Price * Data.Discount / 100} $</strong></p>
                                    </div>
                                </div>
                            }>
                        </Card.Meta>

                }} src={Data.Image[0]} />}
        >
        </Card>
    )
}
