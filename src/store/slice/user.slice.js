import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        cart: [],
        receipts: []
    },
    reducers: {
        setData: function (state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        addCart: (state, action) => {
            let check = state.cart.find(item => item.id === action.payload.id)
            if (check) {
                return {
                    ...state,
                    cart: state.cart.map((item) => {
                        if(item.id == action.payload.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }
                        return item
                    })
                }
            }
            else {
                return {
                    ...state,
                    cart: [...state.cart, {
                        ...action.payload,
                        quantity: 1
                    }]
                }
            }

        },
        setCart: function(state, action) {
            return {
                ...state,
                cart: action.payload
            }
        },
        setReceipts: function(state, action) {
            return {
                ...state,
                receipts: action.payload
            }
        },
        changeQuantity: function(state, action) {
            return {
                ...state, 
                cart: state.cart.map((item) => {
                    if(item.id == action.payload.id) {
                        return {
                            ...item,
                            quantity: action.payload.quantity
                        }
                    }
                    return item
                })
            }
        },
        delItem: function (state, action){
            return{
                ...state,
                cart: state.cart.filter(item => item.id != action.payload),
            }
        },
        addNewReceipt: function(state, action) {
            return {
                ...state,
                cart: [],
                receipts: [...state.receipts, action.payload]
            }
        }
    }
})

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;