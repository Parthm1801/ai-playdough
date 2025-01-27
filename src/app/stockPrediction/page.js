'use client';
import {useAppSelector} from "@/store/hooks";
import PageHeading from "@/app/stockPrediction/components/PageHeading";
import ReportLoading from "@/app/stockPrediction/components/ReportLoading";
import GeneratedReport from "@/app/stockPrediction/components/GeneratedReport";
import InputStocks from "@/app/stockPrediction/components/InputStocks";

const StockPredictionPage = () => {
    const isReportLoading = useAppSelector(state => state.stockPrediction.reportLoading);
    const isReportGenerated = useAppSelector(state => state.stockPrediction.report);
    return <div  style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        textAlign: 'center',
    }}>
        <PageHeading/>
        {
            isReportLoading
                ? <ReportLoading/>
                : isReportGenerated
                    ? <GeneratedReport/>
                    : <InputStocks/>

        }
    </div>
}
export const runtime = "edge";
export default StockPredictionPage;
