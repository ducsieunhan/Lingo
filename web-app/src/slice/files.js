import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";

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

const fileSlice = createSlice({
    name: "file",
    initialState: {
        excelData: [],
        questionList: [],
        answerList: [],
        loading: false,
        error: null,
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
                    point: 0,
                    answerKey: null,
                    explanation: null,
                    part: item.part,
                    category: item.category,
                    mediaUrl: mediaUrl,
                    testTitle: testTitle,
                    answers: reqAnswer,
                };

                questions.push(question);
            });

            state.questionList = questions;
            state.answerList = answers;
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
            });
    },
});

const { reducer } = fileSlice;
export default reducer;
export const { extractData } = fileSlice.actions;
