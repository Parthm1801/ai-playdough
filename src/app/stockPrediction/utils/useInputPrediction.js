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
                console.log("* * * * ", process.env.NEXT_PUBLIC_OPEN_AI_KEY);
                const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
                const response = await fetch(url)
                const data = await response.text()
                const status = response.status
                if (status === 200) {
                    return data
                } else {
                    console.error('error: ', response.status)
                }
            }))
            fetchReport(stockData.join(''))
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
            const openai = new OpenAI({
                apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
                dangerouslyAllowBrowser: true,
                defaultOrganisation: 'org-lMbYjma3VasH1xvj0aV4S9q6'
            })
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            })
            dispatch(setReport(response.choices[0].message.content));
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
