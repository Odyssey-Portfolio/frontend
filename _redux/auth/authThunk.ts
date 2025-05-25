import { LoginFormFields, RegisterFormFields } from "@/_models/AuthFormFields";
import { login, register } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (fields: LoginFormFields, thunkAPI) => {
    try {
      const response = await login(fields);
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

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (fields: RegisterFormFields, thunkAPI) => {
    try {
      const response = await register(fields);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        // Type-guard AxiosError
        return thunkAPI.rejectWithValue(
          error.response?.data || "Something went wrong"
        );
      console.log(error);
    }
  }
);
