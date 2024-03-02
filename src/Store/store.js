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
        case "UPDATE-DATA": {
            // const Check = state.Data.filter(item => item.id === action.payload.id && item.Detail.Size.Name === action.payload.Detail.Size.Name);
            // if (Check.length > 0) {
            //     state.Data = state.Data.map((item) => {
            //         if (item.id !== action.payload.id || item.Detail.Size.Name !== action.payload.Detail.Size.Name)
            //             return item;
            //         else
            //             action.payload.Detail.Quantity = item.Detail.Quantity + action.payload.Detail.Quantity;
            //         return action.payload
            //     })
            //     return {
            //         ...state,
            //         Data: [...state.Data]
            //     }
            // }
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
    // DrawerReducer
})

export const store = legacy_createStore(reducer);