// src/styles/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #1c1c1c;  /* Dark background */
    color: #ffffff;  /* White text for contrast */
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
