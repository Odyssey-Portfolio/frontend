import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateBlogModalState {
  isVisible: boolean;
  content: string;
}

const initialState: CreateBlogModalState = {
  isVisible: false,
  content: "",
};

const createBlogModalSlice = createSlice({
  name: "createBlogModal",
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setVisibility } = createBlogModalSlice.actions;
export default createBlogModalSlice.reducer;
