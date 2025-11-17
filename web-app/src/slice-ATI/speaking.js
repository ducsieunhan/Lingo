import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { getResult, submitSpeaking } from "../config/api-ATI";

const initialState = {
  result: {},
  resultId: null,
  loading: false,
  error: null
};

export const createSubmit = createAsyncThunk(
  "speaking/create",
  async (formData) => {
    return await submitSpeaking(formData);
  }
);

export const retrieveResult = createAsyncThunk(
  "speaking/retrieve",
  async (id) => {
    let status = "PENDING";
    let response;

    while (status !== "COMPLETED") {
      response = await getResult(id);
      status = response.status;
      console.log("Status current: ", status);

      if (status !== "COMPLETED") {
        await new Promise((resolve) => setTimeout(resolve, 20000));
      }
    }
    console.log(response);
    return response;
  }
);

const speakingSlice = createSlice({
  name: "speaking",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(createSubmit, retrieveResult), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejected(createSubmit, retrieveResult), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(createSubmit), (state, action) => {
        state.loading = false;
        state.resultId = action.payload.submission_id;
      })
      .addMatcher(isFulfilled(retrieveResult), (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.resultId = action.payload.submission_id;
      });
  },
})

export default speakingSlice.reducer; 