import { useNavigate } from "react-router-dom";

import { Wrapper } from "./Styles";

export const AppFooter = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <button onClick={() => navigate("/exercises")}>exercises</button>
      <button onClick={() => navigate("/workout")}>workout</button>
      <button onClick={() => navigate("/data")}>data</button>
    </Wrapper>
  );
};
