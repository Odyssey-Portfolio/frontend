import { CreateBlog } from "@/_models/CreateBlog";
import { createBlog } from "@/api/blog";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlogThunk = createAsyncThunk(
  "createBlogModal/create",
  async (blog: CreateBlog, { rejectWithValue }) => {
    try {
      const response = await createBlog(blog);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
