import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  messages: string[];
}

const initialState: SnackbarState = {
  messages: [],
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    pushMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    popMessage: (state) => {
      state.messages.pop();
    },
  },
});

export default snackbarSlice.reducer;
