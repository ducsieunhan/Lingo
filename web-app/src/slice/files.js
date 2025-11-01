import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";
import { modifyExplanationResourceMedia, modifyQuestionResourceMedia, uploadMultipleFiles, uploadOneFile } from "../service/FileService";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";

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
            dispatch(updateProgress(percent));
        });
    }
);

export const saveSingleFile = createAsyncThunk(
    "files/uploadSingleFiles",
    async ({ file, testTitle, fileCategory }) => {
        return await uploadOneFile(file, testTitle, fileCategory);
    }
)

export const saveUpdatingResourceMedia = createAsyncThunk(
    "files/updateMediaResource",
    async ({ resourceId, file, testTitle, fileCategory, currentResourceContent, updatedFileName, }) => {
        return await modifyQuestionResourceMedia(resourceId, file, testTitle, fileCategory, currentResourceContent, updatedFileName);
    }
)

export const saveUpdatingExplanationResourceContent = createAsyncThunk(
    "files/updateMediaResource",
    async ({ questionId, file, testTitle, fileCategory, currentResourceContent, updatedFileName, }) => {
        return await modifyExplanationResourceMedia(questionId, file, testTitle, fileCategory, currentResourceContent, updatedFileName);
    }
)
const fileSlice = createSlice({
    name: "file",
    initialState: {
        excelData: [],
        questionList: [],
        answerList: [],
        loading: false,
        error: null,
        uploadedFiles: [],
        fileUpdating: null,
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
                    resourceContent: item.resourceContent || mediaUrl,
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
            .addCase(readExcelFile.fulfilled, (state, action) => {
                state.loading = false;
                state.excelData = action.payload;
            })
            .addCase(saveSingleFile.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(saveSingleFile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(saveSingleFile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(saveMultipleFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadedFiles.push(action.payload);
            })
            .addMatcher(
                (action) =>
                    [saveUpdatingResourceMedia.fulfilled.type, saveUpdatingExplanationResourceContent.fulfilled.type].includes(action.type),
                (state, action) => {
                    state.loading = false;
                    state.fileUpdating = action.payload
                }
            )

            .addMatcher(
                (action) =>
                    [readExcelFile.pending.type, saveMultipleFiles.pending.type, saveUpdatingResourceMedia.pending.type, saveUpdatingExplanationResourceContent.pending.type].includes(action.type),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) =>
                    [readExcelFile.rejected, saveMultipleFiles.rejected, saveUpdatingResourceMedia.rejected, saveUpdatingExplanationResourceContent.rejected].includes(action.type),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
    }

});

const { reducer } = fileSlice;
export default reducer;
export const { extractData, updateProgress, updateQuestions } = fileSlice.actions;
