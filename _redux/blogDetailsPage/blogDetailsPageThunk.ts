import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBlogById } from "../../api/blog";

export const getBlogByIdThunk = createAsyncThunk(
  "blogDetailsPage/get",
  async (params: string, thunkAPI) => {
    try {
      const response = await getBlogById(params);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Something went wrong"
        );
      }
      console.log(error);
    }
  }
);
