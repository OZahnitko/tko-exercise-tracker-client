import { DateTime } from "luxon";

import { useAppHooks } from "@hooks";

import { Wrapper } from "./Styles";

export const ExerciseLog = () => {
  const { currentDate, selectedDate, setSelectedDate } = useAppHooks();
  return (
    <Wrapper>
      <h1>{DateTime.fromISO(selectedDate).toFormat("yyyy LLL dd")}</h1>
      <button
        onClick={() =>
          setSelectedDate(
            DateTime.fromISO(selectedDate).minus({ days: 1 }).toISO()
          )
        }
      >
        prev
      </button>
      <button onClick={() => setSelectedDate(currentDate)}>TODAY</button>
      <button
        onClick={() =>
          setSelectedDate(
            DateTime.fromISO(selectedDate).plus({ days: 1 }).toISO()
          )
        }
      >
        next
      </button>
      <br />
      <button>Add</button>
    </Wrapper>
  );
};
