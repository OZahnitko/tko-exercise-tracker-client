import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

import type { AppInitialState, Initialized, SelectedDate } from "@types";

const initialState: AppInitialState = {
  currentDate: DateTime.now().toISO(),
  initialized: true,
  selectedDate: DateTime.now().toISO(),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialized: (state, { payload }: PayloadAction<Initialized>) => ({
      ...state,
      initialized: payload,
    }),
    setSelectedDate: (state, { payload }: PayloadAction<SelectedDate>) => ({
      ...state,
      selectedDate: payload,
    }),
  },
});

export const { setInitialized, setSelectedDate } = appSlice.actions;

export default appSlice.reducer;
