import { UNAUTHORIZED } from "@/_constants/ResponseCodes";
import { ApiResponse } from "@/_models/ApiResponse";
import { CreateBlog } from "@/_models/CreateBlog";
import { UpdateBlog } from "@/_models/UpdateBlog";
import { createBlog, deleteBlog, updateBlog } from "@/api/blog";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DeleteBlog } from "../../_models/DeleteBlog";

export const createBlogThunk = createAsyncThunk(
  "blogModal/create",
  async (blog: CreateBlog, { rejectWithValue }) => {
    try {
      const response = await createBlog(blog);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === UNAUTHORIZED) {
        // Type-guard AxiosError
        const apiResponse: ApiResponse = {
          statusCode: error.status,
          message: "I'm sorry but have you tried logging in again?",
          returnData: "",
        };
        return rejectWithValue(apiResponse);
      }
      console.log(error);
    }
  }
);

export const updateBlogThunk = createAsyncThunk(
  "blogModal/update",
  async (blog: UpdateBlog, { rejectWithValue }) => {
    try {
      const response = await updateBlog(blog);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === UNAUTHORIZED) {
        // Type-guard AxiosError
        const apiResponse: ApiResponse = {
          statusCode: error.status,
          message: "I'm sorry but have you tried logging in again?",
          returnData: "",
        };
        return rejectWithValue(apiResponse);
      }
      console.log(error);
    }
  }
);

export const deleteBlogThunk = createAsyncThunk(
  "blogModal/delete",
  async (blog: DeleteBlog, { rejectWithValue }) => {
    try {
      const response = await deleteBlog(blog);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === UNAUTHORIZED) {
        // Type-guard AxiosError
        const apiResponse: ApiResponse = {
          statusCode: error.status,
          message: "I'm sorry but have you tried logging in again?",
          returnData: "",
        };
        return rejectWithValue(apiResponse);
      }
      console.log(error);
    }
  }
);
