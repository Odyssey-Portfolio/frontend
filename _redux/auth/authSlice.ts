import { LoginFormFields } from "@/_models/AuthFormFields";
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./authThunk";

interface AuthState {
  loginFormFields: LoginFormFields | undefined;
  isLoading: boolean;
  isSuccessful: boolean;
}

const initialState: AuthState = {
  loginFormFields: undefined,
  isLoading: false,
  isSuccessful: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = action.payload;

        console.log("Current token: ", response.data.returnData);
      });
  },
});

// export const { setBlogDetails } = authSlice.actions;
export default authSlice.reducer;
