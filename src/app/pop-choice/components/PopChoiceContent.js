"use client";
import {Radio, RadioGroup, Sheet, Typography} from "@mui/joy";
import {setDuration, setEra, setGenre} from "@/store/slices/PopChoiceSlice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/store/hooks";

const PopChoiceContent = () => {
    const dispatch = useDispatch();
    const shouldShowOptions = useAppSelector(state => state.popChoice.isOptionsPage);
    const currentAnswer = useAppSelector(state => state.popChoice.currentAnswer);

    const questionData = [
        {
            question: "Are you in a mood to watch something new or classic?",
            options: ["new", "classic"],
            action: (value) => dispatch(setEra(value))
        },
        {
            question: "What are you in a mood for?",
            options: ["action", "comedy", "drama", "horror", "kids"],
            action: (value) => dispatch(setGenre(value))
        },
        {
            question: "How much time do you have?",
            options: ["1-2 hours", "2+ hours"],
            action: (value) => dispatch(setDuration(value))
        },
    ]

    const questionSection = (index) => (
        <div>
            <Typography level="title-md" color={"white"}>{questionData[index].question}</Typography>
            <RadioGroup
                defaultValue={questionData[index].options[0]}
                orientation="horizontal"
                size="lg"
                sx={{ gap: 1.5 }}
            >
                {
                    (questionData[index].options).map((value, index) => (
                        <Sheet key={value} sx={{ p: 2, borderRadius: 'md', boxShadow: 'sm' }}>
                            <Radio
                                label={`${value}`}
                                overlay
                                disableIcon
                                onClick={e => questionData[index].action(e.target.value)}
                                value={value}
                                slotProps={{
                                    label: ({ checked }) => ({
                                        sx: {
                                            fontWeight: 'lg',
                                            fontSize: 'md',
                                            color: checked ? 'text.primary' : 'text.secondary',
                                        },
                                    }),
                                    action: ({ checked }) => ({
                                        sx: (theme) => ({
                                            ...(checked && {
                                                '--variant-borderWidth': '2px',
                                                '&&': {
                                                    // && to increase the specificity to win the base :hover styles
                                                    borderColor: "green",
                                                    backgroundColor: "lightgreen",
                                                },
                                            }),
                                        }),
                                    }),
                                }}
                            />
                        </Sheet>
                    ))
                }
            </RadioGroup>
        </div>
    );

    if (shouldShowOptions) {
        return <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "left",
            gap: '10px',
        }}>
            {questionSection(0)}
            {questionSection(1)}
            {questionSection(2)}
        </div>
    }

    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "left",
        gap: '10px',
    }}>
        <Typography level={"title-lg"} color={"white"}>{currentAnswer.movie}</Typography>
        <Typography level={"title-sm"} color={"white"}>{currentAnswer.about}</Typography>
    </div>
}

export default PopChoiceContent;
