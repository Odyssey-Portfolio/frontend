import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { createComment, getComments } from "../../api/comments";
import { GetCommentParams } from "../../_models/comment/GetCommentParams";
import { CreateComment } from "../../_models/comment/CreateComment";

export const getCommentThunk = createAsyncThunk(
  "comment/get",
  async (params: GetCommentParams, thunkAPI) => {
    try {
      const response = await getComments(params);
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
export const createCommentThunk = createAsyncThunk(
  "comment/create",
  async (params: CreateComment, thunkAPI) => {
    try {
      const response = await createComment(params);
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
