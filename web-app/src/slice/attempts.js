import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllAttempts, getAttempt, getAttemptUserShort, postAttempt, putAttempt } from "../config/api";

const initialState = {
  attempts: [

  ],
  allAttempts: [

  ],
  attempt: {
    sectionResults: [],
    answers: []
  },
  attemptId: '',
  loading: false,
  error: null
};

export const createAttempts = createAsyncThunk(
  "attempts/create",
  async (testData, { rejectWithValue }) => {
    try {
      const res = await postAttempt(testData);
      return res;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const updateAttempt = createAsyncThunk(
  "attempts/update",
  async (attemptData, { rejectWithValue }) => {
    try {
      const res = await putAttempt(attemptData);
      return res;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const retrieveAttempts = createAsyncThunk(
  "attempts/retrieveAllData",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getAttemptUserShort(userId);
      // return res;
      return res;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const retrieveAttempt = createAsyncThunk(
  "attempts/retrieve",
  async (attemptId, { rejectWithValue }) => {
    try {
      const res = await getAttempt(attemptId);
      return res;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const retrieveAllAttempts = createAsyncThunk(
  "attempts/retrieveAll",
  async ({ rejectWithValue }) => {
    try {
      const res = await getAllAttempts();
      return res;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data)
      } else {
        return rejectWithValue("Lỗi không xác định")
      }
    }
  }
)

const attemptSlice = createSlice({
  name: "attempts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(createAttempts, updateAttempt, retrieveAttempts, retrieveAttempt, retrieveAllAttempts),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isFulfilled(createAttempts),
        (state, action) => {
          state.attemptId = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isFulfilled(updateAttempt, retrieveAttempt),
        (state, action) => {
          state.attempt = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isFulfilled(retrieveAttempts),
        (state, action) => {
          state.attempts = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isFulfilled(retrieveAllAttempts),
        (state, action) => {
          state.allAttempts = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(createAttempts, updateAttempt, retrieveAttempts, retrieveAttempt, retrieveAllAttempts),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  }
});

export default attemptSlice.reducer;