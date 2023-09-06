import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice"
import imageSlice from "./features/imageSlice";
export default configureStore({
    reducer: {
        auth:  AuthReducer,
        image: imageSlice,
    },
})