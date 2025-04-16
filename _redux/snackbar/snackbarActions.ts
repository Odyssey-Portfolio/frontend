import { createAction } from "@reduxjs/toolkit";

export const setSnackbarMessage = createAction<string>("snackbar/pushMessage");
export const removeSnackbarMessage = createAction<string>(
  "snackbar/popMessage"
);
