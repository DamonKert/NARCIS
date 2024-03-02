import { Button, Modal, Typography } from 'antd'
import React, { useState } from 'react'

export default function ChangeSizeModal(props) {
    const { Data, Show, OnClose } = props;
    const [Size, setSize] = useState({});
    if (Data === undefined) {
        return <></>
    }
    const HandleSave = () => {
        Data.Detail.Size = Size;
        Data.Detail.Quantity = 1;
        props.HandleSave(Data);
        OnClose();
    }
    return (
        <Modal
            afterOpenChange={(value) => {
                if (value === true) {
                    setSize(Data.Detail.Size);
                }
            }}
            closable
            open={Show}
            OnClose={OnClose}
            onCancel={OnClose}
            okButtonProps={{ className: "d-none" }}
            cancelButtonProps={{ className: "d-none" }}
        >
            <div className='p-5 pb-0'>
                <div className='d-flex justify-content-center align-items-center w-100 flex-column'>
                    <Typography.Title>
                        Size
                    </Typography.Title>
                    <div className='d-flex gap-2 mt-3'>
                        {Data.size.map((item, index) => {
                            return <div key={index}
                                role='button'
                                onClick={() => {
                                    setSize(item);
                                }} style={{ border: '1px solid', borderColor: (Size.Name === item.Name ? "black" : "lightgrey"), width: 40, height: 25 }} className='d-flex justify-content-center align-items-center'>
                                <div>{item.Name}</div>
                            </div>
                        })}
                    </div>
                    <div className='mt-3'>
                        <Typography.Text>[Required] Please select an option</Typography.Text>
                    </div>
                </div>
                <Button block className='mt-3' onClick={HandleSave}>
                    Saved Changes
                </Button>
            </div>
        </Modal>
    )
}