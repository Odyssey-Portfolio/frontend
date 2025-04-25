import { UNAUTHORIZED } from "@/_constants/ResponseCodes";
import { ApiResponse } from "@/_models/ApiResponse";
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
      if (error.status === UNAUTHORIZED) {
        const apiResponse: ApiResponse = {
          statusCode: error.status,
          message: "I'm sorry but have you tried logging in again?",
          returnData: "",
        };
        return rejectWithValue(apiResponse);
      }
    }
  }
);
