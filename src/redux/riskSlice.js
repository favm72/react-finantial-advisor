import { createSlice } from '@reduxjs/toolkit';
import { levels } from '../data/risk';

const initialState = {
    list: levels,
    selected: null,
    table: true,
}

export const riskSlice = createSlice({
    name: 'risk',
    initialState,
    reducers: {
        setRisk: (state, action) => {
            state.selected = action.payload;
        },
        setTable: (state, action) => {
            state.table = action.payload;
        }
    },
    extraReducers:  {  },
});

export const { setRisk, setTable } = riskSlice.actions;

export const selectRisk = (state) => state.risk;

export default riskSlice.reducer;
