import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IPopChoiceState {
    era: string,
    genre: string,
    duration: string,
    isOptionsPage: boolean,
    currentAnswer: {
        movie: string,
        about: string
    }
}

const initialState: IPopChoiceState = {
    era: null,
    genre: null,
    duration: null,
    isOptionsPage: true,
    currentAnswer: null
}

const popChoiceSlice = createSlice({
    name: "popChoice",
    initialState,
    reducers: {
        setEra: (state: IPopChoiceState, action: PayloadAction<string>) => {
            state.era = action.payload;
        },
        setGenre: (state: IPopChoiceState, action: PayloadAction<string>) => {
            state.genre = action.payload;
        },
        setDuration: (state: IPopChoiceState, action: PayloadAction<string>) => {
            state.duration = action.payload;
        },
        setCurrentAnswer: (state: IPopChoiceState, action: PayloadAction<{
            movie: string,
            about: string
        }>) => {
            state.currentAnswer = action.payload;
        },
        setIsOptionsPage: (state: IPopChoiceState, action: PayloadAction<boolean>) => {
            state.isOptionsPage = action.payload;
        }
    }
})

export const {setEra, setGenre, setDuration, setCurrentAnswer, setIsOptionsPage} = popChoiceSlice.actions;
export default popChoiceSlice.reducer;
