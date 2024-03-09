import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";

// const DrawerReducer = (state = {
//     CurrentObj: {},
//     Show: false,
// }
//     , action) => {
//     switch (action.type) {
//         case "OPEN":
//             return {
//                 ...state,
//                 Show: action.payload.Show,
//                 CurrentObj: { ...action.payload.Data }
//             }
//         case "CLOSE":
//             return {
//                 ...state,
//                 Show: action.payload.Show,
//                 CurrentObj: {}
//             }

//         default:
//     }
//     return { ...state };
// }

const MoneyReducer = (state = {
    Multiple: 1,
    Name: "USD $",
    Symbol: "$"
}, action) => {
    switch (action.type) {
        case "CHANGE-CURRENCY":
            return { ...state, Multiple: action.payload.Multiple, Name: action.payload.Name, Symbol: action.payload.Symbol };
        default:
    }
    return { ...state };
}

const CartReducer = (state = {
    Data: []
}, action) => {
    switch (action.type) {
        case "ADD-CART": {
            const Check = state.Data.filter(item => item.id === action.payload.id && item.Detail.Size.Name === action.payload.Detail.Size.Name);
            if (Check.length > 0) {
                state.Data = state.Data.map((item) => {
                    if (item.id !== action.payload.id || item.Detail.Size.Name !== action.payload.Detail.Size.Name)
                        return item;
                    // else
                    if (item.Detail.Quantity + action.payload.Detail.Quantity > item.Detail.Size.quantity)
                        action.payload.Detail.Quantity = item.Detail.Size.quantity;
                    else
                        action.payload.Detail.Quantity = item.Detail.Quantity + action.payload.Detail.Quantity;
                    return action.payload
                })
                return {
                    ...state,
                    Data: [...state.Data]
                }
            }
            return {
                ...state,
                Data: [...state.Data, { ...action.payload }]
            }
        }
        case "DELETE-DATA":
            return {
                ...state,
                Data: [...state.Data.filter((item) => item.id !== action.payload.id)]
            };

        case "UPDATE-SIZE": {
            const newData = state.Data.filter(item => item.id !== action.payload.Data.id || action.payload.Data.Detail.Size.Name !== item.Detail.Size.Name);

            const check = newData.filter(item => item.id === action.payload.Data.id && action.payload.Size.Name === item.Detail.Size.Name);

            if (check.length > 0) {
                const updatedData = newData.map(item => {
                    if (item.id === action.payload.Data.id && action.payload.Size.Name === item.Detail.Size.Name) {
                        const updatedQuantity = action.payload.Data.Detail.Quantity + item.Detail.Quantity;
                        item.Detail.Quantity = updatedQuantity > item.Detail.Size.quantity ? item.Detail.Size.quantity : updatedQuantity;
                    }
                    return item;
                });

                return {
                    ...state,
                    Data: updatedData
                };
            } else {
                action.payload.Data.Detail.Size = action.payload.Size;
                const updatedState = state.Data.map(item => {
                    return item.id === action.payload.Data.id ? action.payload.Data : item;
                });

                return {
                    ...state,
                    Data: updatedState
                };
            }
        }
        case "UPDATE-DATA": {
            state.Data = state.Data.map((item) => {
                return item.id !== action.payload.id || item.Detail.Size.Name !== action.payload.Detail.Size.Name ? item : action.payload
            })
            return {
                ...state,
                Data: [...state.Data]
            }
        }
        default:
    }
    return { ...state };
}

const reducer = combineReducers({
    CartReducer,
    // DrawerReducer,
    MoneyReducer
})

export const store = legacy_createStore(reducer);