import { User, UserSchema } from "@/app/shared/models/user";
import UserService from "@/app/shared/services/auth/user.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseStatus } from "../models/response-status";
import { signOut } from "next-auth/react";
import { GoogleUser } from "@/app/api/auth/models/google-user";
import { RootState } from "../store";
import jwt from "jsonwebtoken";
import { z } from "zod";

const AccessJwtPayloadSchema = z.object({
  user: UserSchema,
});

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

        const decodedToken = AccessJwtPayloadSchema.parse(
          jwt.decode(action.payload)
        );
        localStorage.setItem("accessToken", action.payload);
        state.value.user = decodedToken.user as User;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.value.status = ResponseStatus.FAILED;
        state.value.isAuthenticated = false;
        state.value.user = null;
      });
  },
});

export const userState = (state: RootState) => state.authReducer.value.user;
export const { logout } = auth.actions;
export default auth.reducer;
