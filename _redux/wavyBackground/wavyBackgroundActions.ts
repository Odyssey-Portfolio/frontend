import { createAction } from "@reduxjs/toolkit";

export const toggleWavyBackground = createAction<boolean>(
  "wavyBackground/toggleBackground"
);
