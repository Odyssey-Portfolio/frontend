import { createAction } from "@reduxjs/toolkit";
import { SnackbarMessage } from "./snackbarSlice";

export const setSnackbarMessage = createAction<SnackbarMessage>(
  "snackbar/pushMessage"
);
export const removeSnackbarMessage = createAction<string>(
  "snackbar/removeMessage"
);
