import { User } from "@/app/shared/models/user";
import UserService from "@/app/shared/services/auth/user.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseStatus } from "../models/response-status";
import { signOut } from "next-auth/react";
import { GoogleUser } from "@/app/api/auth/models/google-user";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuthenticated: boolean;
  status: ResponseStatus;
  user: User | null;
};

const initialState: InitialState = {
  value: {
    isAuthenticated: false,
    user: null,
    status: ResponseStatus.IDLE,
  },
};

const userService = new UserService();

export const authenticate = createAsyncThunk(
  "authenticate",
  async (user: GoogleUser) => {
    return await userService.authenticateUser(user);
  }
);

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      signOut();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.value.status = ResponseStatus.LOADING;
        state.value.isAuthenticated = false;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.value.status = ResponseStatus.SUCCEEDED;
        state.value.isAuthenticated = true;
        state.value.user = action.payload;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.value.status = ResponseStatus.FAILED;
        state.value.isAuthenticated = false;
        state.value.user = null;
      });
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
