import { Route, Routes } from "react-router-dom";

import {
  AppFooter,
  AppHeader,
  ExerciseLog,
  Exercises,
  Workout,
} from "@components";

import {
  ContentContainer,
  FooterContainer,
  HeaderContainer,
  RootWrapper,
} from "./Styles";

export const App = () => {
  return (
    <RootWrapper>
      <HeaderContainer>
        <AppHeader />
      </HeaderContainer>
      <ContentContainer>
        <Routes>
          <Route element={<ExerciseLog />} path="/" />
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
