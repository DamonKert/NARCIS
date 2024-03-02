// import { Image } from 'antd'
import { HomeOutlined, MenuOutlined, SearchOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import SearchDrawer from '../Component/Drawer/SearchDrawer'
import { List_Image } from '../Image/ListImage';
import ProductDetailDrawer from '../Component/Drawer/ProductDetailDrawer'
import { connect } from 'react-redux'
import ListMenu from '../Component/ListMenu'
import ListMenuDrawer from '../Component/Drawer/ListMenuDrawer'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function DefaultPage(props) {
    const { Data } = props;
    const MobileNavRef = useRef();
    const [ShowSearchDrawer, setShowSearchDrawer] = useState(false);
    const [ShowMenuDrawer, setShowMenuDrawer] = useState(false);

    const navigation = useNavigate();
    useEffect(() => {
        let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
        document.addEventListener('scroll', (e) => {
            const scrollTopPosition = window.scrollY || document.documentElement.scrollTop;
            if (scrollTopPosition > lastScrollTop) {
                MobileNavRef.current.style.marginBottom = '0px';
            } else if (scrollTopPosition < lastScrollTop) {
                MobileNavRef.current.style.marginBottom = '-50px';
            }
            lastScrollTop =
                scrollTopPosition <= 0 ? 0 : scrollTopPosition;
        });
    }, [])
    return (
        <div className='M-Container'>
            <div className='M-Header'>
                <div className='M-Max-Responsive-1024'>
                    <MenuOutlined onClick={() => { setShowMenuDrawer(true) }} style={{ fontSize: 22 }} />
                </div>
                <div>
                    <Link to='/'>
                        <LazyLoadImage className='M-Logo-Responsive' src={List_Image.Logo} alt={"Narcis Logo"} />
                    </Link>
                </div>
                <div className='M-Max-Responsive-1024'>
                    <SearchOutlined onClick={() => { setShowSearchDrawer(true) }} style={{ fontSize: 22 }} />
                </div>
                <div className='mt-4 w-100 d-none d-lg-flex justify-content-center position-relative'>
                    {/* <div className='w-100'> */}
                    <ListMenu />
                    {/* </div> */}
                    <div className='d-flex position-absolute' style={{ right: 0 }}>
                        <SearchOutlined onClick={() => { setShowSearchDrawer(true) }} style={{ fontSize: 22 }} />
                        <Badge className='m-3' count={Data.length}>
                            <ShoppingOutlined onClick={() => {
                                navigation('/order/cart');
                            }} className='ms-3' style={{ fontSize: 22 }} />
                        </Badge>
                    </div>
                </div>
            </div>
            <div className='M-Content'>
                <Outlet />
            </div>
            <div className='M-Footer'>
                <Link to={'/'}>
                    <LazyLoadImage className='M-Logo-Responsive' src={List_Image.Logo} alt={"Narcis Logo"} />
                    {/* <Image className='M-Logo-Responsive' src={List_Image.Logo} /> */}
                </Link>
            </div>
            <div ref={MobileNavRef} style={{ borderTop: '1px solid', borderColor: 'lightgrey' }} className='M-Mobile-Nav'>
                <div>
                    <SearchOutlined onClick={() => {
                        setShowSearchDrawer(true)
                    }} style={{ fontSize: 22 }} />
                </div>
                <div>
                    <HomeOutlined onClick={() => {
                        navigation('/');
                    }} style={{ fontSize: 22 }} />
                </div>
                <div>
                    <Badge count={Data.length}>
                        <ShoppingOutlined onClick={() => {
                            navigation('/order/cart');
                        }} style={{ fontSize: 22 }} />
                    </Badge>
                </div>
            </div>
            <SearchDrawer show={ShowSearchDrawer} onClose={() => setShowSearchDrawer(false)} />
            {/* <ProductDetailDrawer /> */}
            <ListMenuDrawer show={ShowMenuDrawer} onClose={() => setShowMenuDrawer(false)} />
        </div >
    )
}

const mapStateToProps = (state) => ({
    Data: state.CartReducer.Data,
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);