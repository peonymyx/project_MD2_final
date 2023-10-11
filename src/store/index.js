import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/user.slice"
import { productReducer } from "./slice/product.slice";

export const store = configureStore({
    reducer: {
        userStore: userReducer,
        productStore: productReducer
    }
})