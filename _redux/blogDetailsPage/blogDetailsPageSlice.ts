import { GetBlog } from "@/_models/GetBlog";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogDetailsPageState {
  blogDetails: GetBlog | undefined;
}

const initialState: BlogDetailsPageState = {
  blogDetails: undefined,
};

const blogDetailsPageSlice = createSlice({
  name: "blogDetailsPage",
  initialState,
  reducers: {
    setBlogDetails: (state, action: PayloadAction<GetBlog>) => {
      state.blogDetails = action.payload;
    },
  },
});

export const { setBlogDetails } = blogDetailsPageSlice.actions;
export default blogDetailsPageSlice.reducer;
