import { ApiResponse } from "@/_models/ApiResponse";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { createSlice } from "@reduxjs/toolkit";
import { UpdateUserDetailsRequest } from "../../_models/user/UpdateUserDetailsRequest";
import { updateUserAvatarThunk, updateUserDetailsThunk } from "./userThunk";
import { USER_MODES } from "../../_constants/User";

interface UserState {
  request: UpdateUserDetailsRequest | undefined;
  isLoading: boolean;
  apiResponse: ApiResponse | undefined;
  loggedInUser: LoggedInUser | undefined;
  userMode: USER_MODES | undefined;
}

const initialState: UserState = {
  request: undefined,
  isLoading: false,
  apiResponse: undefined,
  loggedInUser: undefined,
  userMode: undefined,
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
      })
      .addCase(updateUserAvatarThunk.pending, (state) => {
        state.isLoading = true;
        state.userMode = USER_MODES.UPDATE_AVATAR;
      })
      .addCase(updateUserAvatarThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(updateUserAvatarThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
