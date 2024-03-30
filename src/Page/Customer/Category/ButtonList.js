import { Button, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'

export default function ButtonList({ CurrentType, setCurrentType }) {
    const [ListButton, setListButton] = useState([]);

    useEffect(() => {
        
    }, [])

    return (
        <Row gutter={[12, 12]}>
            {ListButton.map(item => {
                return <Col key={item.id}>
                    <Button
                        onClick={() => setCurrentType(item.id)}
                        className={'border-dark rounded-pill pe-3 ps-3 ' + (CurrentType !== item.id ? 'text-dark bg-white' : "bg-dark")
                        }> {item.Name}</Button>
                </Col>
            })}
        </Row>
    )
}
