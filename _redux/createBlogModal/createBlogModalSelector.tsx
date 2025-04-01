import { RootState } from "../store";

export const selectVisiblity = (state: RootState) => state.createBlogModal.isVisible