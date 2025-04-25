import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SnackbarType = "info" | "success" | "error";
export interface SnackbarMessage {
  id: string;
  message: string;
  type?: SnackbarType;
  duration?: number;
}

interface SnackbarState {
  messages: SnackbarMessage[];
}

const initialState: SnackbarState = {
  messages: [],
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    pushMessage: (state, action: PayloadAction<SnackbarMessage>) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export default snackbarSlice.reducer;
