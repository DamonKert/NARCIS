import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

export default function CategoryBreadcrumb({ Category, Child }) {
    const itemBreadcrumb = [{
        title: <Link style={{ textDecoration: 'none' }} to={'/'}>Home</Link>,
    },
    {
        title: Category.Name,
    },];
    if (Child !== undefined) {
        itemBreadcrumb.push({
            title: Child,
        })
    }
    return (
        <div className='p-3 d-none d-lg-flex justify-content-end'>
            <Breadcrumb
                items={itemBreadcrumb}
            />
        </div>
    )
}
