import { ApiResponse } from "@/_models/ApiResponse";
import { GetBlog } from "@/_models/GetBlog";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBlogThunk } from "./blogModalThunk";

interface CreateBlogModalState {
  isLoading: boolean;
  isVisible: boolean;
  isUpdateMode: boolean;
  selectedBlog: GetBlog | undefined;
  apiResponse: ApiResponse | undefined;
}

const initialState: CreateBlogModalState = {
  isLoading: false,
  isVisible: false,
  isUpdateMode: false,
  selectedBlog: undefined,
  apiResponse: undefined,
};

const createBlogModalSlice = createSlice({
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
      });
  },
});

export const { setVisibility, setIsLoading, setIsUpdateMode, setBlog } =
  createBlogModalSlice.actions;
export default createBlogModalSlice.reducer;
