import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAttempt, getAttemptUserShort } from "../config/testsApi";

const initialState = {
  attempts: [

  ],
  attempt: {
    sectionResults: [],
    answers: []
  },
  loading: false,
  error: null
};

export const retrieveAttempts = createAsyncThunk(
  "attempts/retrieveAll",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getAttemptUserShort(userId);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); // custom error từ backend
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
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); // custom error từ backend
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

const attemptSlice = createSlice({
  name: "attempts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(retrieveAttempts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(retrieveAttempts.fulfilled, (state, action) => {
        state.attempts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(retrieveAttempts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(retrieveAttempt.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(retrieveAttempt.fulfilled, (state, action) => {
        state.attempt = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(retrieveAttempt.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default attemptSlice.reducer;