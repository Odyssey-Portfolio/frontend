import { createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../_models/ApiResponse";
import { createCommentThunk, getCommentThunk } from "./commentThunk";
import { GetCommentDto } from "../../_models/comment/GetCommentDto";
import { Pagination } from "../../_models/Pagination";

interface CommentState {
  comments: GetCommentDto[] | undefined;
  createCommentResponse: ApiResponse | undefined;
  getCommentPagination: Pagination;
  isFetchingComments: boolean;
  isCreatingComment: boolean;
}

const initialState: CommentState = {
  comments: undefined,
  isFetchingComments: false,
  isCreatingComment: false,
  createCommentResponse: undefined,
  getCommentPagination: {
    pageNumber: 1,
    pageSize: 5,
    totalPages: 0,
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    bumpPageNumber: (state) => {
      state.getCommentPagination.pageNumber =
        state.getCommentPagination.pageNumber + 1;
    },
    clearComments: (state) => {
      state.comments = initialState.comments;
      state.getCommentPagination = initialState.getCommentPagination;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCommentThunk.pending, (state) => {
        state.isFetchingComments = true;
      })
      .addCase(getCommentThunk.fulfilled, (state, action) => {
        state.isFetchingComments = false;
        const apiResponse = action.payload as ApiResponse;

        state.getCommentPagination = {
          pageNumber: apiResponse.returnData.pageNumber,
          pageSize: apiResponse.returnData.pageSize,
          totalPages: apiResponse.returnData.totalPages,
        };

        if (!state.comments?.length) {
          state.comments = apiResponse.returnData.comments;
        } else {
          state.comments.push(...apiResponse.returnData.comments);
        }
      })
      .addCase(getCommentThunk.rejected, (state) => {
        state.isFetchingComments = false;
      })
      .addCase(createCommentThunk.pending, (state) => {
        state.isCreatingComment = true;
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.isCreatingComment = false;
        state.createCommentResponse = action.payload as ApiResponse;
      })
      .addCase(createCommentThunk.rejected, (state, action) => {
        state.isCreatingComment = false;
        state.createCommentResponse = action.payload as ApiResponse;
      });
  },
});

export default commentsSlice.reducer;
