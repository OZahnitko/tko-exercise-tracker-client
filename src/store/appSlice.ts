import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

const initialState: { currentDate: string; initialized: boolean } = {
  currentDate: DateTime.now().toISO(),
  initialized: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialized: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      initialized: payload,
    }),
  },
});

export const { setInitialized } = appSlice.actions;

export default appSlice.reducer;
