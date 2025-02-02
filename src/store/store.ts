import { configureStore } from '@reduxjs/toolkit';
import StockPredictionSlice from "./slices/StockPredictionSlice";
import askMyDocumentSlice from "./slices/AskMyDocumentSlice";
import popChoiceSlice from "./slices/PopChoiceSlice";

const store = configureStore({
    reducer: {
        stockPrediction: StockPredictionSlice,
        askMyDocument: askMyDocumentSlice,
        popChoice: popChoiceSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
