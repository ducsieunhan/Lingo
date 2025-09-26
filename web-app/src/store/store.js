import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authentication';

export const store = configureStore({
    reducer: {
        authentication: authReducer
    },
});
