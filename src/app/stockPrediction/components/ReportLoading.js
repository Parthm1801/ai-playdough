'use client';
import {Typography} from "@mui/joy";

const ReportLoading = () => {
    return <>
        <img src="/loader.svg" alt="loading..."/>
        <Typography level="title-md">
            Generating report please wait...
        </Typography>
    </>
}

export default ReportLoading;
