import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";
import { uploadMultipleFiles } from "../service/FileService";
import { FaFileUpload } from "react-icons/fa";

export const readExcelFile = createAsyncThunk(
    "files/readExcelFile",
    async (file, { rejectWithValue }) => {
        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // convert Excel -> JSON
            return XLSX.utils.sheet_to_json(worksheet, { defval: null });
        } catch (error) {
            return rejectWithValue("Không đọc được file Excel");
        }
    }
);

export const saveMultipleFiles = createAsyncThunk(
    "files/uploadMultipleFiles",
    async ({ files, testTitle, fileCategory }, { dispatch }) => {
        return await uploadMultipleFiles(files, testTitle, fileCategory, (percent) => {
            dispatch(updateProgress(percent));  // <-- update slice
        });
    }
);


const fileSlice = createSlice({
    name: "file",
    initialState: {
        excelData: [],
        questionList: [],
        answerList: [],
        loading: false,
        error: null,
        uploadedFiles: [],
        uploadPercent: 0
    },
    reducers: {
        extractData: (state, action) => {
            const { testTitle, mediaUrl } = action.payload;
            let questions = [];
            let answers = [];

            state.excelData.forEach((item) => {
                let reqAnswer = [];
                ["A", "B", "C", "D"].forEach((opt) => {
                    const answer = {
                        content: item[`answer_${opt}`],
                        correct: item.correct_answer === opt ? "true" : "false",
                    };
                    reqAnswer.push(answer);
                    answers.push(answer);
                });

                const question = {
                    title: item.content,
                    point: 5,
                    answerKey: item.correct_answer,
                    explanation: item.explanation,
                    part: item.part,
                    category: item.category,
                    resourceContent: mediaUrl,
                    testTitle: testTitle,
                    answers: reqAnswer,
                    explanationResourceContent: item.explanationResourceContent,
                    questionNumber: item.number
                };

                questions.push(question);
            });

            state.questionList = questions;
            state.answerList = answers;
        },
        updateProgress: (state, action) => {
            state.uploadPercent = action.payload
        },
        updateQuestions: (state, action) => {
            state.questionList = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(readExcelFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(readExcelFile.fulfilled, (state, action) => {
                state.loading = false;
                state.excelData = action.payload;
            })
            .addCase(readExcelFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(saveMultipleFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadedFiles.push(action.payload);
            })
            .addCase(saveMultipleFiles.pending, (state, action) => {
                state.loading = true;
                state.error = null
            }).addCase(saveMultipleFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

const { reducer } = fileSlice;
export default reducer;
export const { extractData, updateProgress, updateQuestions } = fileSlice.actions;
