import { GetBlogsParams } from "@/_models/GetBlogsParams";
import { getBlogs } from "@/api/blog";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBlogsThunk = createAsyncThunk(
  "getBlogs/get",
  async (params: GetBlogsParams, thunkAPI) => {
    try {
      const response = await getBlogs(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
