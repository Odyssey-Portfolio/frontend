import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WavyBackgroundState {
  enabled: boolean;
}

const initialState: WavyBackgroundState = {
  enabled: true,
};

const WavyBackgroundSlice = createSlice({
  name: "wavyBackground",
  initialState,
  reducers: {
    toggleBackground: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
  },
});

export default WavyBackgroundSlice.reducer;
