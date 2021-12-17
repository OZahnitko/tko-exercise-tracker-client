import { Route, Routes } from "react-router-dom";

import { AppFooter, Exercises, Workout } from "@components";

import { ContentContainer, FooterContainer, RootWrapper } from "./Styles";

export const App = () => {
  return (
    <RootWrapper>
      <ContentContainer>
        <Routes>
          <Route element={<Exercises />} path="/exercises" />
          <Route element={<Workout />} path="/workout" />
          <Route element={<div>More Exercise Data</div>} path="/data" />
        </Routes>
      </ContentContainer>
      <FooterContainer>
        <AppFooter />
      </FooterContainer>
    </RootWrapper>
  );
};
