import { useEffect, useState } from "react";

import { useAppSelector } from "@hooks";
import type { Exercise } from "@types";
import { getAllExercises } from "@utilities";

import { Wrapper } from "./Styles";

export const Workout = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const isIn = useAppSelector(({ app: { initialized } }) => initialized);

  const handleGetAllExercises = async () => {
    const allExercises = await getAllExercises();
    setExercises(() => allExercises.data?.value);
  };

  useEffect(() => {
    handleGetAllExercises();
  }, []);

  return (
    <Wrapper>
      <pre>{JSON.stringify({ exercises, isIn }, null, 2)}</pre>
    </Wrapper>
  );
};
