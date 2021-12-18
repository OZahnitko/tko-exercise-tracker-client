import localForage from "localforage";

import type { Exercise, LocalStoragePayload } from "@types";
import { PayloadMessage } from "@types";

const setData = async (
  key: string,
  value: any
): Promise<LocalStoragePayload> => {
  try {
    const result = await localForage.setItem(key, value);
    return { data: { key, value: result }, message: PayloadMessage.set };
  } catch (err) {
    return handleErr();
  }
};

const getData = async (key: string): Promise<LocalStoragePayload> => {
  try {
    const data = (await localForage.getItem(key)) as any;
    if (!data) {
      return { message: PayloadMessage.empty };
    } else {
      return { data: { key, value: data }, message: PayloadMessage.ok };
    }
  } catch (err) {
    return handleErr();
  }
};

const handleErr = () => ({
  message: PayloadMessage.err,
});

export const addExercise = async (
  exercise: Exercise
): Promise<LocalStoragePayload> => {
  const exercises = await getData("exercises");
  if (exercises.message === PayloadMessage.empty) {
    const res = await setData("exercises", [exercise]);
    return res;
  } else {
    const found = exercises.data?.value.find(
      (e: any) => e.name === exercise.name
    );
    let newExercises;
    if (!found) {
      newExercises = [...exercises.data?.value, exercise];
    } else {
      newExercises = exercises.data?.value;
    }
    const res = await setData("exercises", newExercises);
    return res;
  }
};

export const removeExercise = async (
  exerciseName: string
): Promise<LocalStoragePayload> => {
  const exercises = await getData("exercises");
  const res = await setData("exercises", [
    ...exercises.data?.value.filter(
      (exercise: Exercise) => exercise.name !== exerciseName
    ),
  ]);
  return { data: res.data, message: PayloadMessage.removed };
};

export const getAllExercises = async (): Promise<LocalStoragePayload> => {
  const exercises = await getData("exercises");
  if (exercises.data?.value.length) {
    return {
      data: { key: "exercises", value: exercises.data?.value },
      message: PayloadMessage.ok,
    };
  } else {
    return { message: PayloadMessage.empty };
  }
};

/*
What are the cases for adding a new workout: 
1. There are no workouts recorded at all.
- Need to create a new "workouts entry" and add the date and the exercise as the first entry.
2. There are no workouts for the current date.
3. There are no workouts with the same exercise.
4. There is a workout with the same exercise.
 */

export const addToWorkout = async ({
  date,
  exercise,
}: {
  date: string;
  exercise: { name: string; sets: { reps: number; weight: number }[] };
}) => {
  // Check if the "workouts" entry exist in local storage
  const workouts = await getData("workouts");
  // No "workouts entry"
  if (workouts.message === PayloadMessage.empty) {
    return await setData("workouts", { [date]: [exercise] });
  }
  const selectedDateWorkouts = workouts.data?.value[date];
  console.log(selectedDateWorkouts);
  // No "workouts" for the selected date
  if (!selectedDateWorkouts) {
    await setData("workouts", {
      ...workouts.data?.value,
      [date]: [exercise],
    });
  } else {
    const selectedExerciseData = selectedDateWorkouts.find(
      (e: any) => e.name === exercise.name
    );
    console.log(selectedExerciseData);
    if (!selectedExerciseData) {
      await setData("workouts", {
        ...workouts.data?.value,
        [date]: [...selectedDateWorkouts, exercise],
      });
    }
  }
};

export const getDateWorkout = async (date: string) => {
  const res = await getData("workouts");
  if (res.message === PayloadMessage.empty)
    return { message: PayloadMessage.empty };
  const selectedDateWorkout = res.data?.value[date];
  if (!selectedDateWorkout) {
    return { data: [], message: PayloadMessage.ok };
  } else {
    return { data: selectedDateWorkout, message: PayloadMessage.ok };
  }
};
