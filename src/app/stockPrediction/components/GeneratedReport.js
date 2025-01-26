import {useAppSelector} from "@/store/hooks";
import {Typography} from "@mui/joy";

const GeneratedReport = () => {
    const errorReport = useAppSelector(state => state.stockPrediction.reportGenerationFailed);
    const report = useAppSelector(state => state.stockPrediction.report);
    return <div
        style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '10px',
        }}
    >
        <Typography level="title-md">Your Report 😜</Typography>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '1px solid black',
                margin: '20px',
                padding: '20px',
            }}
        >
            <Typography level="title-md">
                {
                    errorReport
                        ? 'There is an error in processing your request, please try again after sometime.'
                        : report
                }
            </Typography>
        </div>
        <Typography>&copy; This is not real financial advice!</Typography>
    </div>;
}

export default GeneratedReport;
