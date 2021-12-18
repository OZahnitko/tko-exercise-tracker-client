export type Initialized = boolean;

export type SelectedDate = string;

export interface AppInitialState {
  currentDate: string;
  initialized: Initialized;
  selectedDate: SelectedDate;
}
