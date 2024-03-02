import { Breadcrumb, Carousel, Col, Divider, Image, Row, Typography } from 'antd';
import React, { useState } from 'react'
// import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'
import ProductDetailInput from '../../Component/ProductDetailInput';
import ImageGroupPreview from '../../Component/ImageGroupPreview';
import StackForMobile from '../../Component/StackForMobile';
import SuggestCollection from './SuggestCollection';
import { List_Image } from '../../Image/ListImage';
// import { connect } from 'react-redux';


export default function ProductDetailPage() {
    // const [Loading, setLoading] = useState(true);
    const [Size, setSize] = useState({});
    const [Quantity, setQuantity] = useState(0);
    const location = useLocation();
    const Data = {
        id: 1,
        Title: "wrap style   pleated skirt dress " + 1,
        Price: 4000,
        Discount: 20,
        // Image: List_Image.Image,
        Image: List_Image.Image_3,
        category: "Dress",
        Description: "Formal fabric with a smooth surface, wrap-style dress. The waist size can be adjusted with the strap inserted into the waist of the right layer to create a dress fit, skirt pleat detail from the left body waist cut, long sleeves with a slim silhouette, and a pleated line at the back. Emphasis on lines with darts.",
        size: [{ Name: 'M', quantity: 50 }, { Name: 'S', quantity: 50 }, { Name: "L", quantity: 50 }, { Name: "XL", quantity: 50 }],
        Model: "C1-030"
    }
    // const Data = location.state.Data;
    const [CurrentImage, setCurrentImage] = useState(Data.Image[0]);
    const [ShowGroupPreview, setShowGroupPreview] = useState(false);
    console.log(1, location);
    console.log(2, Data);
    return (
        <div>
            <div className='M-Max-Responsive-1024'>
                <div>
                    <StackForMobile Header={"Product details"} />
                </div>
                <div>
                    <Carousel
                        //If need fade effect
                        // effect="fade"
                        lazyLoad={true}
                        //If want to act like a slider
                        draggable
                        autoplay
                        style={{ fontSize: 20 }}
                    >
                        {Data.Image.map((item, index) => {
                            return <Image width={"100vw"} className='M-Aspect object-fit-cover' preview={false} src={item} key={index} />
                        })}
                    </Carousel>
                </div>
            </div>
            <div className='M-Container-Detail'>
                <div className='p-3 d-none d-lg-flex justify-content-end'>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link style={{ textDecoration: 'none' }} to={'/'}>Home</Link>,
                            },
                            {
                                title: <Link style={{ textDecoration: 'none' }} to={`/${Data.category}`}>{Data.category}</Link>,
                            },
                            // {
                            //     title: <Link style={{ textDecoration: 'none' }} to={`/${Data.category}/${'All'}`}>All</Link>,
                            // },
                        ]}
                    />
                </div>
                <Row gutter={150} className='me-0 ms-0'>
                    <Col lg={12} className='M-Min-Responsive-1024 M-Remove-Col-Padding'>
                        <div>
                            <Image style={{ aspectRatio: '1/1' }} src={CurrentImage} className='w-100 object-fit-cover' preview={{ visible: false }} onClick={() => { setShowGroupPreview(true) }} />
                        </div>
                        <div className='d-flex gap-3 mt-4'>
                            <Image onMouseOver={() => {
                                setCurrentImage(Data.Image[0]);
                            }} src={Data.Image[0]} className='object-fit-cover' width={100} height={100} />
                            <Image onMouseOver={() => {
                                setCurrentImage(Data.Image[1]);
                            }} src={Data.Image[1]} className='object-fit-cover' width={100} height={100} />
                            <Image onMouseOver={() => {
                                setCurrentImage(Data.Image[2]);
                            }} src={Data.Image[2]} className='object-fit-cover' width={100} height={100} />
                            <Image onMouseOver={() => {
                                setCurrentImage(Data.Image[3]);
                            }} src={Data.Image[3]} className='object-fit-cover' width={100} height={100} />
                        </div>
                    </Col>
                    <Col lg={12} className='p-0 mt-5 mt-lg-0' style={{ borderTop: "3px solid black" }}>
                        <Row >
                            <Col span={20}>
                                <Typography.Title level={2} className='pt-4 pb-4'>{Data.Title}</Typography.Title>
                            </Col>
                            {/* <Col span={4} className='d-flex justify-content-center align-items-center'> */}
                            <div className='text-white Discount-Box d-flex justify-content-center align-items-center' style={{ borderRadius: '50%', backgroundColor: 'black' }}>
                                {Data.Discount}%
                            </div>
                            {/* </Col> */}
                        </Row>
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <Row>
                                    <Col xs={10} lg={6}>
                                        DESCRIPTION
                                    </Col>
                                    <Col xs={14} lg={18} className='M-Font-Size-For-Text'>
                                        {Data.Description}
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col xs={10} lg={6}>
                                        MODEL#
                                    </Col>
                                    <Col xs={14} lg={18}>
                                        {Data.Model}
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col xs={10} lg={6}>
                                        O. PRICE
                                    </Col>
                                    <Col xs={14} lg={18}>
                                        <Typography.Text delete>{Data.Price}$</Typography.Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col xs={10} lg={6}>
                                        C. PRICE
                                    </Col>
                                    <Col xs={14} lg={18}>
                                        {Data.Price - (Data.Price * Data.Discount / 100) + '$'}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Divider style={{ border: '1px solid', borderColor: "lightgrey" }} />
                        <ProductDetailInput NotDrawer={true} Data={Data} Size={Size} setSize={setSize} setQuantity={setQuantity} Quantity={Quantity} />

                        <div>
                            <Typography.Paragraph>
                                <br />
                                NARCIS' average delivery time is approximately 2 to 3 days.
                                <br />
                                <br />
                                We produce and inspect all products ourselves, and manage inventory, so
                                all orders are shipped the same or next day.
                                <br />
                                <br />
                                Orders over 50,000 won receive free shipping.
                            </Typography.Paragraph>
                        </div>
                    </Col>
                </Row>
                <div>
                    <SuggestCollection />
                </div>
                <ImageGroupPreview Images={Data.Image} Show={ShowGroupPreview} OnClose={() => setShowGroupPreview(false)} />
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     Data: state.CartReducer.Data
// })

// export default connect(mapStateToProps)(ProductDetailPage);