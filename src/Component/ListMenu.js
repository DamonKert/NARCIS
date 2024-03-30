import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../API/API';
import { GET_CATEGORY } from '../API/CustomerURL';
import { Notification } from '../Asset/ShowNotification';

export default function ListMenu({ isInline = false, onClose }) {
    const navigation = useNavigate();
    const [Items, setItems] = useState(undefined);
    useEffect(() => {
        API.POST(GET_CATEGORY)
            .then((result) => {
                const Temp = [];
                result.Data.forEach((item) => {
                    const TempChild = [];
                    if (item.Childs.length > 0) {
                        TempChild.push({
                            label: "ALL",
                            key: item.Id + "/"
                        });
                        item.Childs.forEach(child => {
                            TempChild.push({
                                label: child.Name,
                                key: child.Id,
                            });
                        })
                    }
                    Temp.push({
                        label: item.Name,
                        key: item.Id,
                        children: TempChild.length > 0 && TempChild
                    })
                })
                setItems([...Temp]);
            }).catch((err) => {
                Notification.ShowError("Error 505", "Internal Server Error");
            });;
    }, [])
    return (
        <Menu
            onClick={(value) => {
                console.log(value);
                if (value.keyPath.length > 1) {
                    if (isInline) onClose();
                    navigation(`/category/${value.keyPath[1]}/${value.keyPath[0]}`, {
                        state: {
                            Name: value.keyPath[1],
                            Child: value.key,
                        }
                    })
                }
                else {
                    if (isInline) onClose();
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
            items={Items
                //     || [{
                //     label: 'Top & T-shirts',
                //     key: "TOP--T-SHIRT"
                // }, {
                //     label: 'Shirt & Blouse',
                //     key: "BLOUSE"
                // }, {
                //     label: "One piece & dress",
                //     key: "DRESS",
                //     children: [{
                //         label: "ALL",
                //         key: "ALL"
                //     }, {
                //         label: "MINI-MIDI",
                //         key: "MINI-MIDI"
                //     }, {
                //         label: "LONG - MAXI",
                //         key: "LONG---MAXI"
                //     }, {
                //         label: "JUMPSUIT",
                //         key: "JUMPSUIT"
                //     }]
                // }, {
                //     label: "Pants & Shorts",
                //     key: "PANTS",
                //     children: [{
                //         label: "ALL",
                //         key: "-ALL"
                //     }, {
                //         label: "TROUSERS",
                //         key: "TROUSERS"
                //     }, {
                //         label: "SHORTS",
                //         key: "SHORTS"
                //     }]
                // }, {
                //     label: "Skirt",
                //     key: "SKIRT"
                // }]
            }>
        </Menu>
    )
}
