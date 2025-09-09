import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTest, deleteTest, getAllTests, getOneTest, updateTest } from "../service/TestService";
const initialState = [];

export const createTest = createAsyncThunk(
    "tests/create",
    async (test) => {
        return await addTest(test);
    }
)

export const retrieveAllTests = createAsyncThunk(
    "tests/retrieveAll",
    async () => {
        return await getAllTests();
    }
)

export const retrieveSingleTest = createAsyncThunk(
    "tests/retrieveOne",
    async (id) => {
        return await getOneTest(id);
    }
)

export const modifyTest = createAsyncThunk(
    "tests/update",
    async (id, test) => {
        return await updateTest(id, test);
    }
)

export const removeTest = createAsyncThunk(
    "tests/delete",
    async (id) => {
        return await deleteTest(id);
    }
)

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        [createTest.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveAllTests.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveSingleTest.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [modifyTest.fulfilled]: (state, action) => {
            const index = state.findIndex(test => test.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload
            };
        },
        [removeTest.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        }
    }
})

const { reducer } = testSlice;
export default reducer;