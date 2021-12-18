import { useAppDispatch, useAppSelector } from "@hooks";
import type { SelectedDate } from "@types";
import { setSelectedDate } from "@store";

export const useAppHooks = () => {
  const dispatch = useAppDispatch();

  return {
    currentDate: useAppSelector(({ app: { currentDate } }) => currentDate),
    selectedDate: useAppSelector(({ app: { selectedDate } }) => selectedDate),
    setSelectedDate: (selectedDate: SelectedDate) =>
      dispatch(setSelectedDate(selectedDate)),
  };
};
