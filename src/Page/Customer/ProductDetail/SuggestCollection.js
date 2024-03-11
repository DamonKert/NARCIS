import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { List_Image } from '../../../Image/ListImage';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import ViewProduct from '../../../Component/ViewProduct';
import { Autoplay, Scrollbar } from 'swiper/modules';
import { connect } from 'react-redux';

function SuggestCollection(props) {
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    const Temp_Data = [];
    for (let i = 0; i < 20; i++) {
      const Temp = {
        id: i,
        Name: "wrap style   pleated skirt dress " + i,
        Price: 4000,
        Discount: 20,
        Image: List_Image.Image,
        category: "Dress",
        Description: "Formal fabric with a smooth surface, wrap-style dress. The waist size can be adjusted with the strap inserted into the waist of the right layer to create a dress fit, skirt pleat detail from the left body waist cut, long sleeves with a slim silhouette, and a pleated line at the back. Emphasis on lines with darts.",
        Sizes: [{ Name: 'M', quantity: 50 }, { Name: 'S', quantity: 50 }, { Name: "L", quantity: 50 }, { Name: "XL", quantity: 50 }],
        Model: "C1-030"
      };
      Temp_Data.push(Temp);
    }
    setdataSource([...Temp_Data]);
  }, [])
  return (
    <div>

      <div className='position-relative'>
        <div className='d-flex justify-content-between M-Icon-Container-Detail'>
          <div className='M-Arrow-Swiper-Left user-select-none'>
            <LeftOutlined width={25} height={25}
              onClick={() => {
                const swiper = document.getElementById('Swiper-ID').swiper;
                swiper.slidePrev(1000);
              }} />
          </div>
          <div className='M-Arrow-Swiper-Right user-select-none'>
            <RightOutlined width={25} height={25} onClick={() => {
              const swiper = document.getElementById('Swiper-ID').swiper;
              swiper.slideNext(1000);
            }} />
          </div>
        </div>

        <div className='p-3 overflow-hidden' style={{ position: 'relative' }}>
          <div className='text-center'>
            <Typography.Title level={2}>
              YOU MAY ALSO LIKE
            </Typography.Title>
          </div>
          <div className='text-center'>
            <Typography.Text>
              A collection of related products that are good to buy together
            </Typography.Text>
          </div>
          <Swiper
            id='Swiper-ID'
            breakpoints={{
              0: {
                slidesPerView: 2
              },
              400: {
                slidesPerView: 3
              },
              700: {
                slidesPerView: 4
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
            className="mySwiper mt-lg-4 mt-3"
          >
            {dataSource.map((item, index) => {
              return <SwiperSlide key={index}>
                <ViewProduct Data={item} dispatch={props.dispatch} />
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({ dispatch })


export default connect(null, mapDispatchToProps)(SuggestCollection);