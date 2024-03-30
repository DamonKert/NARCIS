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
            const Check = state.Data.filter(item => item.Id === action.payload.Id && item.Detail.Size.Name === action.payload.Detail.Size.Name);
            if (Check.length > 0) {
                state.Data = state.Data.map((item) => {
                    if (item.Id !== action.payload.Id || item.Detail.Size.Name !== action.payload.Detail.Size.Name)
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
                Data: [...state.Data.filter((item) => item.Id !== action.payload.Id)]
            };

        case "UPDATE-SIZE": {
            console.log(state.Data);
            const Temp = state.Data.filter((item) => item.Id !== action.payload.Data.Id && item.Detail.Size.Id !== action.payload.Data.Detail.Size.Id);

            
            var Check = false;
            const NewState = Temp.map((item) => {
                if (item.Id !== action.payload.Data.Id || item.Detail.Size.Id !== action.payload.Size.Id)
                    return item
                Check = true;
                item.Detail.Quantity += action.payload.Data.Detail.Quantity
                return item;
            })
            if (Check === false) {
                NewState.push({
                    ...action.payload
                });
            }
            return {
                ...state,
                Data: [...NewState]
            };
        }
        case "UPDATE-DATA": {
            state.Data = state.Data.map((item) => {
                return item.Id !== action.payload.Id || item.Detail.Size.Id !== action.payload.Detail.Size.Id ? item : action.payload
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