import { LOGGED_IN_USER } from "@/_constants/Auth";
import { ApiResponse } from "@/_models/ApiResponse";
import { LoginFormFields } from "@/_models/AuthFormFields";
import { serialize } from "@/utils/JsonUtils";
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./authThunk";

interface AuthState {
  loginFormFields: LoginFormFields | undefined;
  isLoading: boolean;
  data: ApiResponse | undefined;
  // loggedInUser: LoggedInUser | undefined;
}

const initialState: AuthState = {
  loginFormFields: undefined,
  isLoading: false,
  data: undefined,
  // loggedInUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthData: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload as ApiResponse;
        // state.loggedInUser = action.payload.returnData as LoggedInUser;
        const loggedInUserString = serialize(action.payload.returnData);
        sessionStorage.setItem(LOGGED_IN_USER, loggedInUserString);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.data = action.payload as ApiResponse;
      });
  },
});

export const { clearAuthData } = authSlice.actions;
export default authSlice.reducer;
