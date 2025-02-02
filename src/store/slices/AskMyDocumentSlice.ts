import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IDocument {
    url: string,
    fileName: string,
}

interface IAskMyDocumentState {
    document: IDocument | null;
    questionText: string;
    answerText: string;
}

const initialState: IAskMyDocumentState = {
    document: null,
    questionText: null,
    answerText: null,
}

const askMyDocumentSlice = createSlice({
    name: "askMyDocument",
    initialState,
    reducers: {
        setDocument: (state: IAskMyDocumentState, action: PayloadAction<IDocument>) => {
            state.document = action.payload
        },
        setQuestionText: (state: IAskMyDocumentState, action: PayloadAction<string>) => {
            state.questionText = action.payload
        },
        setAnswerText: (state: IAskMyDocumentState, action: PayloadAction<string>) => {
            state.answerText = action.payload
        }
    }
});

export const {setDocument, setQuestionText, setAnswerText} = askMyDocumentSlice.actions;

export default askMyDocumentSlice.reducer;
