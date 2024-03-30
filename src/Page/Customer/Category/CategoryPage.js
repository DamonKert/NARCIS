import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import StackForMobile from '../../../Component/StackForMobile';
import { Breadcrumb, Col, List, Row, Typography } from 'antd';
import { Button, Form } from 'react-bootstrap';
import { List_Image } from '../../../Image/ListImage';
import ViewProduct from '../../../Component/ViewProduct';
import { connect } from 'react-redux';
import CategoryBreadcrumb from './CategoryBreadcrumb';
import { API } from '../../../API/API';
import { GET_CATEGORY_BY_ID } from '../../../API/CustomerURL';
import { Notification } from '../../../Asset/ShowNotification';

function CategoryPage(props) {
    const location = useLocation();
    const categorySpilt = location.pathname.split('/');
    const Name = categorySpilt[2];
    const Child = categorySpilt[3] || undefined;
    const [Category, setCategory] = useState({
        "Id": "",
        "Name": "",
        "Childs": []
    });
    const [CurrentType, setCurrentType] = useState(Child || Name);

    useEffect(() => {
        API.GET(GET_CATEGORY_BY_ID(Name))
            .then((result) => {
                setCategory({
                    ...result.Data,
                    Id: result.Data.Id,
                    Name: result.Data.Name,
                    Childs: [...result.Data.Childs],
                })
            }).catch((err) => {
                Notification.ShowError("Error 500", "Internal Server Error");
            });
    }, [Name])
    console.log(Category);
    const [dataSource, setdataSource] = useState([]);
    const [Sort, setSort] = useState({
        ColumnName: "",
        by: ""
    });
    const [TypeButton, setTypeButton] = useState([{
        Name: 'ALL',
        id: 0
    }, {
        Name: "MINI-MIDI",
        id: 1
    }, {
        Name: "LONG-MAXI",
        id: 2
    }, {
        Name: "JUMPSUIT",
        id: 3
    }]);


    useEffect(() => {
        const Temp_Data = [];
        for (let i = 0; i < 100; i++) {
            const Temp = {
                id: i,
                Name: "wrap style   pleated skirt dress " + i,
                Price: 4000,
                Discount: 20,
                Image: i < 5 ? List_Image.Image_1 : i < 10 ? List_Image.Image_2 : i < 15 ? List_Image.Image_3 : List_Image.Image_4,
                category: "Dress",
                Description: "Formal fabric with a smooth surface, wrap-style dress. The waist size can be adjusted with the strap inserted into the waist of the right layer to create a dress fit, skirt pleat detail from the left body waist cut, long sleeves with a slim silhouette, and a pleated line at the back. Emphasis on lines with darts.",
                Sizes: [{ Name: 'M', quantity: 50 }, { Name: 'S', quantity: 50 }, { Name: "L", quantity: 50 }, { Name: "XL", quantity: 50 }],
                Model: "C1-030"
            };
            Temp_Data.push(Temp);
        }
        setdataSource([...Temp_Data]);
    }, [CurrentType, Sort])
    return (
        <div>
            <div className='M-Max-Responsive-1024'>
                <StackForMobile Header={Category.Childs.filter(item => item.id === Child)[0] || Category.Name} />
            </div>
            <div className='M-Container-Detail'>
                {/* <div className='p-3 d-none d-lg-flex justify-content-end'>
                    <Breadcrumb
                        items={itemBreadcrumb}
                    />
                </div> */}
                <CategoryBreadcrumb Category={Category} Child={Child} />
                <h2 className='pb-5 pt-5 fw-bold d-none d-lg-flex justify-content-center'>
                    {Name}
                </h2>
                <Row gutter={[12, 12]}>
                    {TypeButton.map(item => {
                        return <Col key={item.id}>
                            <Button
                                onClick={() => setCurrentType(item.id)}
                                className={'border-dark rounded-pill pe-3 ps-3 ' + (CurrentType !== item.id ? 'text-dark bg-white' : "bg-dark")
                                }> {item.Name}</Button>
                        </Col>
                    })}
                </Row>
                <div>
                    <div className='mt-5 mb-5 d-block d-md-flex justify-content-between align-items-center'>
                        <div className='text-center'>
                            <Typography.Text>
                                There are a total of {dataSource.length} products.
                            </Typography.Text>
                        </div>
                        <div className='mt-3 mt-md-0'>
                            <Form.Select>
                                <option className='text-center' value={"Sort"} onClick={() => { setSort("") }}>
                                    Sort
                                </option>
                                <option className='text-center' onClick={() => { setSort({ ColumnName: "Created_at", by: "ASC" }) }}>New Product</option>
                                <option className='text-center' onClick={() => { setSort({ ColumnName: "Name", by: "ASC" }) }}>Product Name</option>
                                <option className='text-center' onClick={() => { setSort({ ColumnName: "Price", by: "ASC" }) }}>Low Price</option>
                                <option className='text-center' onClick={() => { setSort({ ColumnName: "Price", by: "DESC" }) }}>High Price</option>
                                <option className='text-center' onClick={() => { setSort({ ColumnName: "Special", by: "ASC" }) }}>Special offer</option>
                            </Form.Select>
                        </div>
                    </div>
                    <List
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
                </div>
            </div>
        </div >
    )
}


const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(null, mapDispatchToProps)(CategoryPage);