import { LOGGED_IN_USER } from "@/_constants/Auth";
import { ApiResponse } from "@/_models/ApiResponse";
import { LoginFormFields } from "@/_models/AuthFormFields";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { serialize } from "@/utils/JsonUtils";
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk } from "./authThunk";

interface AuthState {
  loginFormFields: LoginFormFields | undefined;
  isLoading: boolean;
  apiResponse: ApiResponse | undefined;
  loggedInUser: LoggedInUser | undefined;
}

const initialState: AuthState = {
  loginFormFields: undefined,
  isLoading: false,
  apiResponse: undefined,
  loggedInUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthData: (state) => {
      state.apiResponse = initialState.apiResponse;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
        state.loggedInUser = action.payload.returnData as LoggedInUser;
        const loggedInUserString = serialize(action.payload.returnData);
        sessionStorage.setItem(LOGGED_IN_USER, loggedInUserString);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
        sessionStorage.removeItem(LOGGED_IN_USER);
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      });
  },
});

export const { clearAuthData } = authSlice.actions;
export default authSlice.reducer;
