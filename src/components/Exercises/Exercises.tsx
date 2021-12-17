import { useEffect, useState } from "react";

import { PayloadMessage } from "@types";
import { addExercise, getAllExercises, removeExercise } from "@utilities";

import { Wrapper } from "./Styles";

export const Exercises = () => {
  const [exercises, setExercises] = useState<any>(null);
  const [newExerciseName, setNewExerciseName] = useState<string>("");

  const handleGetAllExercises = async () => {
    const allExercises = await getAllExercises();
    setExercises(() => allExercises.data?.value);
  };

  useEffect(() => {
    handleGetAllExercises();
  }, []);

  return (
    <Wrapper>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (newExerciseName) {
            const res = await addExercise({ name: newExerciseName });
            setExercises(() => res.data?.value);
            setNewExerciseName(() => "");
          }
        }}
      >
        <input
          onChange={(e) => setNewExerciseName(e.target.value)}
          value={newExerciseName}
        />
      </form>
      <button
        onClick={async () => {
          if (newExerciseName) {
            const res = await addExercise({ name: newExerciseName });
            setExercises(() => res.data?.value);
            setNewExerciseName(() => "");
          }
        }}
      >
        Add Exercise
      </button>
      {exercises?.map((exercise: any) => (
        <div key={exercise.name}>
          <div>{exercise.name}</div>
          <h1
            onClick={async () => {
              const res = await removeExercise(exercise.name);
              if (res.message === PayloadMessage.removed)
                setExercises(() => res.data?.value);
            }}
          >
            REMOVE
          </h1>
        </div>
      ))}
    </Wrapper>
  );
};
