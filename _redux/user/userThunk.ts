import { LoginFormFields, RegisterFormFields } from "@/_models/AuthFormFields";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateUserDetailsRequest } from "../../_models/user/UpdateUserDetailsRequest";
import { updateUserDetails } from "../../api/user";

export const updateUserDetailsThunk = createAsyncThunk(
  "user/update",
  async (request: UpdateUserDetailsRequest, thunkAPI) => {
    try {
      const response = await updateUserDetails(request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        // Type-guard AxiosError
        return thunkAPI.rejectWithValue(
          error.response?.data || "Something went wrong"
        );
      else console.log(error);
    }
  }
);
