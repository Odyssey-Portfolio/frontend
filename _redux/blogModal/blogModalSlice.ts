import { ApiResponse } from "@/_models/ApiResponse";
import { GetBlog } from "@/_models/GetBlog";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createBlogThunk,
  deleteBlogThunk,
  getBlogByIdThunk,
  updateBlogThunk,
} from "./blogModalThunk";
import { GetBlogByIdDto } from "../../_models/GetBlogByIdDto";

interface BlogModalState {
  isLoading: boolean;
  isVisible: boolean;
  isUpdateMode: boolean;
  previousBlog: GetBlog | undefined;
  selectedBlog: GetBlog | undefined;
  selectedBlogDetails: GetBlogByIdDto | undefined;
  apiResponse: ApiResponse | undefined;
}

const initialState: BlogModalState = {
  isLoading: false,
  isVisible: false,
  isUpdateMode: false,
  previousBlog: undefined,
  selectedBlog: undefined,
  selectedBlogDetails: undefined,
  apiResponse: undefined,
};

const blogModalSlice = createSlice({
  name: "blogModal",
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsUpdateMode: (state, action: PayloadAction<boolean>) => {
      state.isUpdateMode = action.payload;
    },
    setPreviousBlog: (state, action: PayloadAction<GetBlog>) => {
      state.previousBlog = action.payload;
    },
    setBlog: (state, action: PayloadAction<GetBlog>) => {
      state.selectedBlog = action.payload;
    },
    clearCreateBlogResponse: (state) => {
      state.apiResponse = initialState.apiResponse;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlogThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(createBlogThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(updateBlogThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(updateBlogThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(deleteBlogThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(deleteBlogThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      })
      .addCase(getBlogByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = action.payload as ApiResponse;
        state.selectedBlogDetails = response.returnData as GetBlogByIdDto;
      })
      .addCase(getBlogByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.apiResponse = action.payload as ApiResponse;
      });
  },
});

export const {
  setVisibility,
  setIsLoading,
  setIsUpdateMode,
  setBlog,
  setPreviousBlog,
} = blogModalSlice.actions;
export default blogModalSlice.reducer;
