import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAttempts, getAttempt, getAttemptUserShort, postAttempt } from "../config/api";

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
  async () => {
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

      .addCase(createAttempts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAttempts.fulfilled, (state, action) => {
        state.attemptId = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createAttempts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
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
      })
      .addCase(retrieveAllAttempts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(retrieveAllAttempts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allAttempts = action.payload;
      })
      .addCase(retrieveAllAttempts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  }
});

export default attemptSlice.reducer;