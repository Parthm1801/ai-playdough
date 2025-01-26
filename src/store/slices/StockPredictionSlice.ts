import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IStockPredictionState {
    stocks: string[],
    reportLoading: boolean,
    report: null | string,
    stockLength: number,
    reportGenerationFailed: boolean
}

const initialState: IStockPredictionState = {
    stocks: [],
    reportLoading: false,
    report: null,
    stockLength: 0,
    reportGenerationFailed: false
}

const stockPredictionSlice = createSlice({
    name: "stockPrice",
    initialState,
    reducers: {
        addStock: (state: IStockPredictionState, action: PayloadAction<string>) => {
            state.stocks.push(action.payload);
            state.stockLength++;
        },
        toggleReportLoading: (state: IStockPredictionState, action: PayloadAction<boolean>) => {
            state.reportLoading = action.payload
        },
        setReport: (state: IStockPredictionState, action: PayloadAction<string>) => {
            state.report = action.payload
        },
        setReportGenerationFailed: (state: IStockPredictionState, action: PayloadAction<boolean>) => {
            state.reportGenerationFailed = action.payload
        }
    }
});

export const {addStock, toggleReportLoading, setReport, setReportGenerationFailed} = stockPredictionSlice.actions;

export default stockPredictionSlice.reducer;
