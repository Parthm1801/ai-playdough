"use client";
import {Button} from "@mui/joy";
import {useState} from "react";
import {useAppSelector} from "@/store/hooks";
import {useDispatch} from "react-redux";
import {setCurrentAnswer, setIsOptionsPage} from "@/store/slices/PopChoiceSlice";

const PopChoiceFooter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const era = useAppSelector(state => state.popChoice.era);
    const duration = useAppSelector(state => state.popChoice.duration);
    const genre = useAppSelector(state => state.popChoice.genre);
    const shouldShowOptions = useAppSelector(state => state.popChoice.isOptionsPage);
    const dispatch = useDispatch();

    const onButtonClick = async () => {
        if (shouldShowOptions) {
            setIsLoading(true);
            try {
                const response = await fetch('https://movie-recommender-worker.parthm1801.workers.dev', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        era,
                        genre,
                        duration
                    })
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(`Worker Error: ${data.error}`)
                }
                dispatch(setCurrentAnswer(JSON.parse(data)))
                dispatch(setIsOptionsPage(false))
                setIsLoading(false);
            } catch (err) {
                console.error("Something went wrong", err);
                setIsLoading(false);
            }
        } else {
            dispatch(setIsOptionsPage(true))
        }
    }

    return <Button variant="soft" loading={isLoading} onClick={onButtonClick}>{
        shouldShowOptions ? "Let's Go" : "Go Again"
    }</Button>
}

export default PopChoiceFooter