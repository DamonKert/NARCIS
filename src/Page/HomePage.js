import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import ViewProduct from '../Component/ViewProduct';
import SwiperViewProduct from '../Component/SwiperViewProduct';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Scrollbar } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { List_Image } from '../Image/ListImage';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function HomePage(props) {
    const [dataSource, setdataSource] = useState([]);

    useEffect(() => {
        const Temp_Data = [];
        for (let i = 0; i < 20; i++) {
            const Temp = {
                id: i,
                Title: "wrap style pleated skirt dress " + i,
                Price: 4000,
                Discount: 20,
                // Image: List_Image.Image,
                Image: i < 10 ? List_Image.Image_1 : i < 15 ? List_Image.Image_2 : List_Image.Image_3,
                category: "Dress",
                Description: "Formal fabric with a smooth surface, wrap-style dress. The waist size can be adjusted with the strap inserted into the waist of the right layer to create a dress fit, skirt pleat detail from the left body waist cut, long sleeves with a slim silhouette, and a pleated line at the back. Emphasis on lines with darts.",
                size: [{ Name: 'M', quantity: 50 }, { Name: 'S', quantity: 50 }, { Name: "L", quantity: 50 }, { Name: "XL", quantity: 50 }],
                Model: "C1-030"
            };
            Temp_Data.push(Temp);
        }
        setdataSource([...Temp_Data]);
    }, [])
    return (
        <div>
            <div>
                <a href='/category/BLOUSE'>
                    <LazyLoadImage alt='Image-Bander' width={'100%'} src='Images/Bander.jpeg' className='object-fit-fill' />
                </a>
            </div>
            <Container className='mt-md-5 mt-0 p-md-5 p-3 text-center'>
                <Typography.Title level={3} className='fw-bold'>NEW ARRIVALS
                </Typography.Title>
                <List
                    // loading={true}
                    className='mt-4'
                    grid={{
                        gutter: [25, 40],
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    pagination={{ position: "bottom", align: "center", pageSize: 20 }}
                    dataSource={dataSource}
                    renderItem={(item) => (
                        <List.Item>
                            <ViewProduct Data={item} dispatch={props.dispatch} />
                        </List.Item>
                    )}>
                </List>
                <div className='position-relative'>
                    <div className='d-flex justify-content-between M-Icon-Container'>
                        {/* <div className='M-Arrow-Swiper-Left user-select-none M-Min-Responsive-1024'> */}
                        <div className='M-Arrow-Swiper-Left user-select-none'>
                            <LeftOutlined width={25} height={25}
                                onClick={() => {
                                    const swiper = document.getElementById('Swiper-ID').swiper;
                                    swiper.slidePrev(1000);
                                }} />
                        </div>
                        {/* <div className='M-Arrow-Swiper-Right user-select-none M-Min-Responsive-1024'> */}
                        <div className='M-Arrow-Swiper-Right user-select-none'>
                            <RightOutlined width={25} height={25} onClick={() => {
                                const swiper = document.getElementById('Swiper-ID').swiper;
                                swiper.slideNext(1000);
                            }} />
                        </div>
                    </div>

                    <Typography.Title level={3} className='fw-bold mt-5 pt-5'>
                        DRESS COLLECTION
                    </Typography.Title>
                    <div className='p-3 overflow-hidden' style={{ position: 'relative' }}>
                        <Swiper
                            id='Swiper-ID'
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                },
                                400: {
                                    slidesPerView: 2
                                },
                                700: {
                                    slidesPerView: 3
                                }
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            slidesPerView={3}
                            slidesPerGroup={1}
                            spaceBetween={30}
                            scrollbar={{
                                draggable: true,
                                dragSize: 60,
                                snapOnRelease: true
                            }}
                            modules={[Autoplay, Scrollbar]}
                            className="mySwiper mt-lg-4 mt-0"
                        >
                            {dataSource.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <div className='M-Min-Responsive-1024'>
                                        <SwiperViewProduct Data={item} />
                                    </div>
                                    <div className='M-Max-Responsive-1024'>
                                        <ViewProduct Data={item} dispatch={props.dispatch} />
                                    </div>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            </Container >
        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(null, mapDispatchToProps)(HomePage);