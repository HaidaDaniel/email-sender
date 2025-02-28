import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, getCurrentUser } from "@/utils/api";
import { LoginUser, User } from "@/utils/types";

export const login = createAsyncThunk<User, LoginUser>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("authToken", btoa(`${data.username}:${data.password}`));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const relogin = createAsyncThunk<User>(
  "auth/relogin",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const response = await getCurrentUser(token);
      return response;
    } catch (error: any) {
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data || "Session expired");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("authToken") || null,
    username: "",
    email: "",
    id: 0,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.token = null;
      state.username = "";
      state.email = "";
      state.id = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = localStorage.getItem("authToken");
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.id = action.payload.id;
      })
      .addCase(relogin.fulfilled, (state, action) => {
        state.token = localStorage.getItem("authToken");
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.id = action.payload.id;
      })
      .addCase(relogin.rejected, (state) => {
        state.token = null;
        state.username = "";
        state.email = "";
        state.id = 0;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
