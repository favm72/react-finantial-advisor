import { configureStore } from '@reduxjs/toolkit';
import riskReducer from '../redux/riskSlice';

export const store = configureStore({
    reducer: {
        risk: riskReducer,
    },
});
