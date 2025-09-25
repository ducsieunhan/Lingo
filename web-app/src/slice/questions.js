import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMultipleQuestions, addQuestion, deleteQuestion, getAllQuestionForTest, getAllQuestions, getOneQuestion, updateQuestion } from "../service/TestService";

const initialState = [];

export const createQuestion = createAsyncThunk(
    "questions/create",
    async (question) => {
        return await addQuestion(question);
    }
)

export const retrieveAllQuestions = createAsyncThunk(
    "questions/retrieveAll",
    async () => {
        return await getAllQuestions();
    }
)

export const retrieveSingleQuestion = createAsyncThunk(
    "questions/retrieveOne",
    async (id) => {
        return await getOneQuestion(id);
    }
)

export const modifyQuestion = createAsyncThunk(
    "questions/update",
    async (id, question) => {
        return await updateQuestion(id, question);
    }
)

export const removeQuestion = createAsyncThunk(
    "questions/delete",
    async (id) => {
        return await deleteQuestion(id);
    }
)

export const saveMultipleQuestions = createAsyncThunk(
    "questions/saveAll",
    async (questionList) => {
        return await addMultipleQuestions(questionList);
    }
)

export const retrieveQuestionForTest = createAsyncThunk(
    "question/testQuestions",
    async (id) => {
        return await getAllQuestionForTest(id);
    }
)

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        [createQuestion.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveAllQuestions.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveSingleQuestion.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [modifyQuestion.fulfilled]: (state, action) => {
            const index = state.findIndex(question => question.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload
            };
        },
        [removeQuestion.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
        [saveMultipleQuestions.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveAllQuestions.fulfilled]: (state, action) => {
            return [...action.payload];
        }
    }
})

const { reducer } = questionSlice;
export default reducer;