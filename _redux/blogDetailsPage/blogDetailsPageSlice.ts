import { GetBlog } from "@/_models/GetBlog";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBlogByIdThunk } from "./blogDetailsPageThunk";
import { ApiResponse } from "../../_models/ApiResponse";
import { GetBlogByIdDto } from "../../_models/GetBlogByIdDto";

interface BlogDetailsPageState {
  blogDetails: GetBlogByIdDto | undefined;
  isLoading: boolean;
}

const initialState: BlogDetailsPageState = {
  blogDetails: undefined,
  isLoading: false,
};

const blogDetailsPageSlice = createSlice({
  name: "blogDetailsPage",
  initialState,
  reducers: {
    setBlogDetails: (state, action: PayloadAction<GetBlog>) => {
      state.blogDetails = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBlogByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const apiResponse = action.payload as ApiResponse;
        state.blogDetails = apiResponse.returnData;
      })
      .addCase(getBlogByIdThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setBlogDetails } = blogDetailsPageSlice.actions;
export default blogDetailsPageSlice.reducer;
