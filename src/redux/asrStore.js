import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import wishlistSlice from "./slices/wishlistSlice";
import cartSlice from "./slices/cartSlice";



const asrStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishlistSlice,
        cartReducer:cartSlice
    }
})

export default asrStore