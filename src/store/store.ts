import { configureStore } from '@reduxjs/toolkit';
import StockPredictionSlice from "./slices/StockPredictionSlice";

const store = configureStore({
    reducer: {
        stockPrediction: StockPredictionSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
