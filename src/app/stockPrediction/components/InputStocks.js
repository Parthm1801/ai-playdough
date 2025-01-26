'use client';
import {Button, Input, Typography} from "@mui/joy";
import {useState} from "react";
import {addStock, toggleReportLoading} from "@/store/slices/StockPredictionSlice";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import useInputPrediction from "@/app/stockPrediction/utils/useInputPrediction";

const InputStocks = () => {
    const [inputValue, setInputValue] = useState('');
    const inputStockLength = useAppSelector(state => state.stockPrediction.stockLength);
    const inputStocks = useAppSelector(state => state.stockPrediction.stocks);
    const dispatch = useAppDispatch();
    const {generateReport} = useInputPrediction();

    const handleAddTickerClick = () => {
        dispatch(addStock(inputValue));
        setInputValue('');
    }

    const handleGenerateReport = () => {
        generateReport();
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        textAlign: 'center',
        margin: '20px'
    }}>
        <Typography level="title-md">
            Add up to 3 stock tickers below to get a super accurate stock predictions report👇
        </Typography>
        <div
            style={{
                display: 'flex',
                gap: '5px'
            }}
        >
            <Input
                placeholder='NVDA'
                value={inputValue}
                disabled={inputStockLength >= 3}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            ></Input>
            <Button
                disabled={inputStockLength >= 3}
                onClick={handleAddTickerClick}
            >+</Button>
        </div>
        {
            inputStockLength >= 1
                ? inputStocks.map(stock => {
                    return <Typography level="title-md" key={stock}>
                        {stock}
                    </Typography>
                })
                : <Typography level="title-md">Your tickers will appear here...</Typography>
        }
        <Button
            disabled={inputStockLength <= 0}
            onClick={handleGenerateReport}
        >
            GENERATE REPORT
        </Button>
    </div>
}

export default InputStocks;
