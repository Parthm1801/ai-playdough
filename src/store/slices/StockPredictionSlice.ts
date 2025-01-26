import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IStockPriceState {
    stocks: string[],
    buttonEnabled: boolean,
    reportLoading: boolean,
    report: null | string,
    stockLength: number
}

const initialState: IStockPriceState = {
    stocks: [],
    buttonEnabled: false,
    reportLoading: false,
    report: null,
    stockLength: 0,
}

const stockPriceSlice = createSlice({
    name: "stockPrice",
    initialState,
    reducers: {
        addStock: (state: IStockPriceState, action: PayloadAction<string>) => {
            state.stocks.push(action.payload);
            state.stockLength++;
        },
        toggleGenerateReport: (state: IStockPriceState, action: PayloadAction<boolean>) => {
            state.buttonEnabled = action.payload
        },
        toggleReportLoading: (state: IStockPriceState, action: PayloadAction<boolean>) => {
            state.reportLoading = action.payload
        },
        setReport: (state: IStockPriceState, action: PayloadAction<string>) => {
            state.report = action.payload
        }
    }
});

export const {addStock, toggleGenerateReport, toggleReportLoading, setReport} = stockPriceSlice.actions;

export default stockPriceSlice.reducer;
