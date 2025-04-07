import { GetBlogsParams } from "@/_models/GetBlogsParams";
import { getBlogs } from "@/api/blog";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBlogsThunk = createAsyncThunk(
  "getBlogs/get",
  async (blog: GetBlogsParams, { rejectWithValue }) => {
    try {
      const response = await getBlogs(blog);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
