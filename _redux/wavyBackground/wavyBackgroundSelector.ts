import { RootState } from "../store";

export const selectWavyBackgroundEnabled = (state: RootState) =>
  state.wavyBackground.enabled;
