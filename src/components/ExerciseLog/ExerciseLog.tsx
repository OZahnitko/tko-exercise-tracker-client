import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppHooks } from "@hooks";
import { PayloadMessage } from "@types";
import { addToWorkout, getAllExercises, getDateWorkout } from "@utilities";

import { Wrapper } from "./Styles";

export const ExerciseLog = () => {
  const [availableExercises, setAvailableExercises] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isExerciseScreen, setIsExerciseScreen] = useState<boolean>(false);
  const [isSelectedExercise, setIsSelectedExercise] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<{
    name: string;
  } | null>(null);
  const [workoutExercises, setWorkoutExercises] = useState<any[]>([]);

  const { currentDate, selectedDate, setSelectedDate } = useAppHooks();
  const navigate = useNavigate();

  const handleGetAllExercises = async () => {
    const allExercises = await getAllExercises();
    console.log(allExercises);
    if (allExercises.message === PayloadMessage.ok) {
      setAvailableExercises(() => allExercises.data?.value);
    } else if (allExercises.message === PayloadMessage.empty) {
      setIsEmpty(() => true);
    }
  };

  const handleGetDateWorkout_c = useCallback(async () => {
    const res = await getDateWorkout(
      DateTime.fromISO(selectedDate).toFormat("yyyy LLL dd")
    );
    console.log(res);
    if (res.message === PayloadMessage.ok) {
      setWorkoutExercises(() => res.data);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (isExerciseScreen) {
      handleGetAllExercises();
    }
    if (!isExerciseScreen) {
      handleGetDateWorkout_c();
    }
  }, [handleGetDateWorkout_c, isExerciseScreen]);

  if (!isExerciseScreen) {
    return (
      <Wrapper>
        <h1 onClick={() => setSelectedDate(currentDate)}>
          {DateTime.fromISO(selectedDate).toFormat("yyyy LLL dd")}
        </h1>
        <button
          onClick={() =>
            setSelectedDate(
              DateTime.fromISO(selectedDate).minus({ days: 1 }).toISO()
            )
          }
        >
          prev
        </button>
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
        <button onClick={() => setIsExerciseScreen(() => true)}>Add</button>
        <br />
        <pre>{JSON.stringify({ workoutExercises }, null, 2)}</pre>
        <br />
        {workoutExercises.map(({ name: exerciseName, sets }) => (
          <div
            key={exerciseName}
            onClick={() => {
              setSelectedExercise(() => ({ name: exerciseName }));
              setIsSelectedExercise(() => true);
              setIsExerciseScreen(() => true);
            }}
          >
            <div>{exerciseName}</div>
            {sets.map((set: any, index: number) => (
              <pre key={index}>{JSON.stringify({ set }, null, 2)}</pre>
            ))}
          </div>
        ))}
      </Wrapper>
    );
  } else {
    if (isExerciseScreen && isSelectedExercise) {
      return (
        <>
          <h1>Actual Exercise Log</h1>
          <pre>{JSON.stringify({ selectedExercise }, null, 2)}</pre>
          <button
            onClick={() => {
              setIsSelectedExercise(() => false);
              setIsExerciseScreen(() => true);
            }}
          >
            BBBB
          </button>
          <button
            onClick={async () => {
              await addToWorkout({
                date: DateTime.fromISO(selectedDate).toFormat("yyyy LLL dd"),
                exercise: {
                  name: selectedExercise!.name,
                  sets: [{ reps: 10, weight: 20 }],
                },
              });
            }}
          >
            ADD THIS ONE
          </button>
          <pre>
            {JSON.stringify(
              {
                ew: workoutExercises.find(
                  (e) => e.name === selectedExercise?.name
                ),
              },
              null,
              2
            )}
          </pre>
        </>
      );
    } else {
      return (
        <>
          <div>Pick the exercise first</div>
          <button
            onClick={() => {
              setIsExerciseScreen(() => false);
              setIsSelectedExercise(() => false);
            }}
          >
            BVBV
          </button>
          {isEmpty ? (
            <>
              <h1>Add some exercises first, you fuck.</h1>
              <button onClick={() => navigate("/exercises")}>
                Add Exercises
              </button>
            </>
          ) : (
            <div>
              {availableExercises.map(({ name: exerciseName }) => (
                <h1
                  key={exerciseName}
                  onClick={() => {
                    setSelectedExercise({ name: exerciseName });
                    setIsSelectedExercise(() => true);
                  }}
                >
                  {exerciseName}
                </h1>
              ))}
            </div>
          )}
        </>
      );
    }
  }
};
