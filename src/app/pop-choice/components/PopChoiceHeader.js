import {Typography} from "@mui/joy";

const PopChoiceHeader = () => {
    return <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
        }}
    >
        <img src={'/pop-corn.svg'} width={150} height={150} alt="Pop Choice" />
        <Typography level="h1" color={"white"}>
            PopChoice
        </Typography>
    </div>
}

export default PopChoiceHeader;
