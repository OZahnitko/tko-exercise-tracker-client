import { useNavigate } from "react-router-dom";

import { Wrapper } from "./Styles";

export const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <button onClick={() => navigate("/")}>HOME</button>
    </Wrapper>
  );
};
