import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBlogThunk } from "./createBlogModalThunk";

interface CreateBlogModalState {
  isLoading: boolean;
  isVisible: boolean;
}

const initialState: CreateBlogModalState = {
  isLoading: false,
  isVisible: false,
};

const createBlogModalSlice = createSlice({
  name: "createBlogModal",
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlogThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setVisibility, setIsLoading } = createBlogModalSlice.actions;
export default createBlogModalSlice.reducer;
