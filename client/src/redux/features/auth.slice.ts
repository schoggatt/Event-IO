import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuthenticated: boolean;
  email: string;
  password: string;
};

const initialState: InitialState = {
  value: {
    isAuthenticated: false,
    email: "",
    password: "",
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      return {
        value: {
          isAuthenticated: action.payload.isAuthenticated,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
