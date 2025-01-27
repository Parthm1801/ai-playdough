import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setReport, setReportGenerationFailed, toggleReportLoading} from "@/store/slices/StockPredictionSlice";
import OpenAI from "openai";
import {dates} from "@/app/stockPrediction/utils/dates";

const useInputPrediction = () => {
    const dispatch = useAppDispatch();
    const tickersArr = useAppSelector(state => state.stockPrediction.stocks);

    async function fetchStockData() {
        try {
            const stockData = await Promise.all(tickersArr.map(async (ticker) => {
                const url = `https://polygon-api-worker.parthm1801.workers.dev/?ticker=${ticker}&startDate=${dates.startDate}&endDate=${dates.endDate}`
                const response = await fetch(url)
                if (!response.ok) {
                    const errMsg = await response.text()
                    throw new Error('Worker error: ' + errMsg)
                }
                return response.text()
            }))
            await fetchReport(stockData.join(''))
        } catch (err) {
            console.error('error: ', err);
            dispatch(setReportGenerationFailed(true));
        }
    }

    async function fetchReport(data) {
        const messages = [
            {
                role: 'system',
                content: 'You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.'
            },
            {
                role: 'user',
                content: data
            }
        ]

        try {
            const url = 'https://ai-playdough-deploy.parthm1801.workers.dev/'

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messages)
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(`Worker Error: ${data.error}`)
            }
            dispatch(setReport(data.content));
            // const temp = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            // dispatch(setReport(temp));
        } catch (err) {
            console.log('Error:'.err);
            dispatch(setReportGenerationFailed(true));
        }
    }

    const generateReport = async () => {
        dispatch(toggleReportLoading(true));
        await fetchStockData();
        dispatch(toggleReportLoading(false));
    }

    return {generateReport}
}

export default useInputPrediction;
