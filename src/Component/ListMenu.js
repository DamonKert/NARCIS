import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ListMenu({ isInline = false }) {
    const navigation = useNavigate();
    return (
        <Menu
            onClick={(value) => {
                if (value.keyPath.length > 1) {
                    navigation(`/category/${value.keyPath[1]}/${value.keyPath[0]}`, {
                        state: {
                            Name: value.keyPath[1],
                            Child: value.key,
                        }
                    })
                }
                else {
                    navigation(`/category/${value.key}`, {
                        state: {
                            Name: value.key,
                            Child: null
                        }
                    })
                }
            }}
            disabledOverflow={true}
            mode={isInline === true ? "inline" : 'horizontal'}
            items={[{
                label: 'Top & T-shirts',
                key: "TOP--T-SHIRT"
            }, {
                label: 'Shirt & Blouse',
                key: "BLOUSE"
            }, {
                label: "One piece & dress",
                // <Link onClick={() => {
                //     navigation(`/category/${'DRESS'}/${'ALL'}`, {
                //         state: {
                //             Name: 'DRESS',
                //             Children: [{
                //                 label: "ALL",
                //                 key: "ALL"
                //             }, {
                //                 label: "MINI-MIDI",
                //                 key: "MINI-MIDI"
                //             }, {
                //                 label: "LONG - MAXI",
                //                 key: "LONG---MAXI"
                //             }, {
                //                 label: "JUMPSUIT",
                //                 key: "JUMPSUIT"
                //             }]
                //         }
                //     })
                //     console.log(1);
                // }} className='M-Menu-List'>One piece & dress</Link>,
                key: "DRESS",
                children: [{
                    label: "ALL",
                    key: "ALL"
                }, {
                    label: "MINI-MIDI",
                    key: "MINI-MIDI"
                }, {
                    label: "LONG - MAXI",
                    key: "LONG---MAXI"
                }, {
                    label: "JUMPSUIT",
                    key: "JUMPSUIT"
                }]
            }, {
                label: "Pants & Shorts",
                // <Link onClick={() => {
                //     navigation(`/category/PANTS/ALL`, {
                //         state: {
                //             Name: 'PANTS',
                //             Children: [{
                //                 label: "ALL",
                //                 key: "ALL",
                //             }, {
                //                 label: "TROUSERS",
                //                 key: "TROUSERS"
                //             }, {
                //                 label: "SHORTS",
                //                 key: "SHORTS"
                //             }]
                //         }
                //     })
                // }} className='M-Menu-List'>Pants & Shorts</Link>,
                key: "PANTS",
                children: [{
                    label: "ALL",
                    key: "-ALL"
                }, {
                    label: "TROUSERS",
                    key: "TROUSERS"
                }, {
                    label: "SHORTS",
                    key: "SHORTS"
                }]
            }, {
                label: "Skirt",
                key: "SKIRT"
            }]}>
        </Menu>
    )
}
