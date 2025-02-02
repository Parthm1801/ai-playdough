'use client';

import InputFileUpload from "@/app/askMyDocument/components/InputFileUpload";
import {useDispatch, useSelector} from "react-redux";
import {Button, Textarea, Typography} from "@mui/joy";
import {setAnswerText, setDocument, setQuestionText} from "@/store/slices/AskMyDocumentSlice";
import {useEffect, useRef} from "react";

export default function AskMyDocument() {
    const dispatch = useDispatch();
    const document = useSelector(state => state.askMyDocument.document);
    const questionText = useSelector(state => state.askMyDocument.questionText);

    const worker = useRef(null);

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('./util/worker.js', import.meta.url), {
                type: 'module'
            });
        }

        const onMessageReceived = (e) => {
            console.log(e.data)
            dispatch(setAnswerText(e.content));
        };

        worker.current.addEventListener('message', onMessageReceived);

        return () => worker.current.removeEventListener('message', onMessageReceived);
    });


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            dispatch(setDocument({
                fileName: file.name,
                url: URL.createObjectURL(file)
            }));
        }
    };

    const handleQuestionChange = (event) => {
        dispatch(setQuestionText(event.target.value));
    }

    const generateAnswer = () => {
        if (worker.current) {
            worker.current.postMessage({
                document: document.url,
                question: questionText,
            })
        }
    }

    return <div>
        <Typography level="title-md">{document?.fileName || ''}</Typography>
        <InputFileUpload
            onChange={handleFileChange}
        />
        <Textarea
            placeholder="Ask anything about the uploaded document…"
            onChange={handleQuestionChange}
            value={questionText || ''}
        />
        <Button
            disabled={!document?.url || !questionText}
            onClick={generateAnswer}
        >
            Ask
        </Button>
    </div>
}
