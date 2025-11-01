import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserInfoApi, handleApiError, loginApi, loginGoogleApi, logoutApi, registerApi, registerGG } from "../config/api";
import { decodeToken } from "../utils/DecodeToken";
import { updateAvatarAccount } from "./accounts";

const initialState = {
  user: JSON.parse(localStorage.getItem('user_profile')) || null,
  token: localStorage.getItem('access_token') || null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null
};

export const initializeAuth = createAsyncThunk(
  'authentication/init',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const userInfo = decodeToken(token);
        return { user: userInfo, token };
      }
      return null;
    } catch (error) {
      localStorage.clear();
      // delete axios.defaults.headers.common['Authorization'];
      return thunkAPI.rejectWithValue("Phiên đăng nhập hết hạn ");
    }
  });


export const login = createAsyncThunk(
  "authentication/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await loginApi(username, password);
      const { access_token } = response;
      localStorage.setItem("access_token", access_token);
      const userInfo = decodeToken(access_token);
      localStorage.setItem('user_profile', JSON.stringify(userInfo));
      return { user: userInfo, token: access_token }
    } catch (error) {
      handleApiError(error, "Đăng nhập thất bại")
      return thunkAPI.rejectWithValue(error?.response?.detail || "Đăng nhập thất bại");
    }
  }
);

export const register = createAsyncThunk(
  "authentication/register",
  async (userData, thunkAPI) => {
    try {
      await registerApi(userData);
      return true;
    } catch (error) {
      handleApiError(error, "Đăng ký thất bại")
      return thunkAPI.rejectWithValue(error?.response?.detail || "Đăng ký thất bại");
    }
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async (clientId, thunkAPI) => {
    try {
      await logoutApi(clientId);
      localStorage.clear();
      delete axios.defaults.headers.common['Authorization'];
      return true;
    } catch (error) {
      handleApiError(error, "Đăng ký thất bại")
      return thunkAPI.rejectWithValue(error?.response?.detail || "Đăng ký thất bại");
    }
  }
);

export const loginGoogle = createAsyncThunk(
  "authentication/loginGG",
  async (code, thunkAPI) => {
    try {
      const response = await loginGoogleApi(code);
      console.log(response);
      const { access_token } = response;   // public axios so need .data
      // console.log("google: ", access_token);
      localStorage.setItem("access_token", access_token);
      const userInfo = decodeToken(access_token);


      localStorage.setItem('user_profile', JSON.stringify(userInfo));
      await registerGG(userInfo, access_token);
      // console.log(userInfo);

      return { user: userInfo, token: access_token }
    } catch (error) {
      handleApiError(error, "Đăng nhập google thất bại");
      return thunkAPI.rejectWithValue(error?.response?.detail || "Đăng xuất thất bại");
    }
  }
);


const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  }, extraReducers: (builder) => {
    builder

      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
      })

      // normal login 
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // normal register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // normal register
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // google flow

      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAvatarAccount.fulfilled, (state, action) => {
        const { avatar } = action.meta.arg;
        state.user.avatar = avatar;
      })

  }

});

const { reducer } = authSlice;
export default reducer;
export const { setIsAuthenticated } = authSlice.actions;