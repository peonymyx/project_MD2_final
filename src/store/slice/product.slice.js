import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: []
    },
    reducers: {
        getProducts: (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        },
        deleteProduct: (state, action) => {
            return {
                ...state,
                data: state.data.filter(product => product.id !== action.payload)
            }
        },
        addProduct: (state, action) => {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        },
    }
})

export const productAction = productSlice.actions;
export const productReducer = productSlice.reducer;