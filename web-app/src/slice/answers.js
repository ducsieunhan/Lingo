import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addAnswer, addMultipleAnswers, deleteAnswer, getAllAnswers, getOneAnswer, updateAnswer } from "../service/TestService";


const initialState = [];

export const createAnswer = createAsyncThunk(
    "answers/create",
    async (answer) => {
        return await addAnswer(answer);
    }
)

export const retrieveAllAnswers = createAsyncThunk(
    "answers/retrieveAll",
    async () => {
        return await getAllAnswers();
    }
)

export const retrieveSingleAnswer = createAsyncThunk(
    "answers/retrieveOne",
    async (id) => {
        return await getOneAnswer(id);
    }
)

export const modifyAnswer = createAsyncThunk(
    "answers/update",
    async (id, answer) => {
        return await updateAnswer(id, answer);
    }
)

export const removeAnswer = createAsyncThunk(
    "answers/delete",
    async (id) => {
        return await deleteAnswer(id);
    }
)

export const saveMultipleAnswers = createAsyncThunk(
    "answers/saveAll",
    async (answerList) => {
        return await addMultipleAnswers(answerList);
    }
)

const answerSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {
        [createAnswer.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveAllAnswers.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveSingleAnswer.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [modifyAnswer.fulfilled]: (state, action) => {
            const index = state.findIndex(answer => answer.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload
            };
        },
        [removeAnswer.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
        [saveMultipleAnswers.fulfilled]: (state, action) => {
            state.push(action.payload);
        }
    }
})

const { reducer } = answerSlice;
export default reducer;