import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

* {
    box-sizing: border-box; 
}

  html, body , #root {
    font-size: 16px;

    height: 100%;

    width: 100%; 
  }
`;
