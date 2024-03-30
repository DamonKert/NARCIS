import { Carousel, Image, Modal } from 'antd'
import React from 'react'

export default function ClothDetailModal({ Show, OnClose, Data, setData }) {
    const HandleClose = () => {
        setData({});
        OnClose();
    }
    if (Data.Name === undefined) {
        return <></>
    }

    return (
        <Modal centered footer={false} open={Show} onCancel={HandleClose}>
            <div className='p-0 pt-5 p-md-5 d-flex align-items-center flex-column gap-3'>
                <div className='w-100'>
                    <Carousel
                        className='w-100'
                        lazyLoad={true}
                        draggable
                        autoplay
                        style={{ fontSize: 20 }}
                    >
                        {Data.ImagePaths.map((item, index) => {
                            return <Image width={"100%"} className='M-Aspect object-fit-cover' preview={false} src={item} key={index} />
                        })}
                    </Carousel>
                </div>
                <div>
                    Id : {Data.Id}
                </div>
                <div>
                    Name : {Data.Name}
                </div>
                <div>
                    Category : {Data.Category.Name}
                </div>
                <div>
                    Code : {Data.Code}
                </div>
                <div>
                    Price : {Data.Price}
                </div>
                <div>
                    Discount : {Data.Discount}
                </div>
                <div>
                    Model ID : {Data.Model.Id}
                </div>
                <div>
                    Model : {Data.Model.Name}
                </div>
                <div>
                    Sizes : {Data.Sizes.map((item, index) => index !== 0 ? ", " + item.Name : item.Name)}
                </div>
            </div>
        </Modal>
    )
}
