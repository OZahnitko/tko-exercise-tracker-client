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

const handleErr = () => {
  return { message: PayloadMessage.err };
};

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

export const addToWorkout = async ({
  date,
  exercise,
}: {
  date: string;
  exercise: { name: string; sets: { reps: number; weight: number }[] };
}) => {
  const workouts = await getData("workouts");
  if (workouts.message === PayloadMessage.empty) {
    setData("workouts", { [date]: [exercise] });
  } else {
    let allWorkouts = workouts.data?.value;
    let selectedDateWorkout = workouts.data?.value[date];
    if (selectedDateWorkout) {
      selectedDateWorkout = [...selectedDateWorkout, exercise];
      await setData("workouts", {
        ...allWorkouts,
        [date]: selectedDateWorkout,
      });
      return { message: PayloadMessage.ok };
    } else {
      await setData("workouts", {
        ...allWorkouts,
        [date]: [exercise],
      });
    }
  }
  return { message: PayloadMessage.ok };
};

export const getDateWorkout = async (date: string) => {
  const res = await getData("workouts");
  if (res.message === PayloadMessage.empty)
    return { message: PayloadMessage.empty };
  const ddd = res.data?.value[date];
  console.log(ddd);
  return { data: ddd, message: PayloadMessage.ok };
};
