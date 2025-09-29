import { createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../_models/ApiResponse";
import { createCommentThunk, getCommentThunk } from "./commentThunk";
import { GetCommentDto } from "../../_models/comment/GetCommentDto";

interface CommentState {
  comments: GetCommentDto[] | undefined;
  createCommentResponse: ApiResponse | undefined;
  isFetchingComments: boolean;
  isCreatingComment: boolean;
}

const initialState: CommentState = {
  comments: undefined,
  isFetchingComments: false,
  isCreatingComment: false,
  createCommentResponse: undefined,
};

const commentsSlice = createSlice({
  name: "blogDetailsPage",
  initialState,
  reducers: {
    //setBlogDetails: (state, action: PayloadAction<GetBlog>) => {
    //  state.blogDetails = action.payload;
    //},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCommentThunk.pending, (state) => {
        state.isFetchingComments = true;
      })
      .addCase(getCommentThunk.fulfilled, (state, action) => {
        state.isFetchingComments = false;
        const apiResponse = action.payload as ApiResponse;
        if (!state.comments) {
          state.comments = apiResponse.returnData;
          return;
        }
        state.comments.push(...apiResponse.returnData);
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
