import { ApiResponse } from "@/_models/ApiResponse";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { serialize } from "@/utils/JsonUtils";
import { createSlice } from "@reduxjs/toolkit";
import { UpdateUserDetailsRequest } from "../../_models/user/UpdateUserDetailsRequest";
import { updateUserDetailsThunk } from "./userThunk";

interface UserState {
  request: UpdateUserDetailsRequest | undefined;
  isLoading: boolean;
  apiResponse: ApiResponse | undefined;
  loggedInUser: LoggedInUser | undefined;
}

const initialState: UserState = {
  request: undefined,
  isLoading: false,
  apiResponse: undefined,
  loggedInUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.apiResponse = initialState.apiResponse;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDetailsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
        state.loggedInUser = action.payload.returnData as LoggedInUser;
      })
      .addCase(updateUserDetailsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
