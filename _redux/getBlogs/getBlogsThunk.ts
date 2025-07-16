import { GetBlogsParams } from "@/_models/GetBlogsParams";
import { getBlogs } from "@/api/blog";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogsThunk = createAsyncThunk(
  "getBlogs/get",
  async (params: GetBlogsParams, thunkAPI) => {
    try {
      const response = await getBlogs(params);
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
