import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const globalStyles = createGlobalStyle`
  :root {
    --black: #000;
    --light-black: #101010;
    --white: #fff;
    --extra-light-grey: #cfcfcf;
    --light-grey: #fafafa;
    --grey: #f1f1f1;
    --orange: #D87D4A;
    --light-orange: #fbaf85;
    --red: #CD2C2C;
    --light-red: #FFC7B0;
    --icon-red: rgb(244, 67, 54);
    --padding: 2.4rem;
    --transition-duration: 150ms;
    --transition-timing-function: ease-in-out;
    --border-radius: 0.8rem;
    --green: rgb(204, 232, 205);
    --light-green: rgb(12, 19, 13);
    --icon-green: rgb(102, 187, 106);
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Manrope', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.5rem;
    line-height: 1.4;
  }

  /* .icon {
    width: 50%;
    height: 50%;
  } */

  #hamburger {
    position: relative;
  }

  .hamburger-is-active {
    span:nth-child(1) {
      top: 50%;
      transform: translateY(-50%) rotate(135deg);
    }

    span:nth-child(2) {
      top: 50%;
      transform: translateY(-50%) translateX(100%);
    }

    span:nth-child(3) {
      bottom: 50%;
      transform: translateY(50%) rotate(225deg);
    }
  }

  @media (min-width: 31.25em) {
    :root {
      --padding: 4rem;
    }
  }

  @media(min-width: 50em) {
    :root {
      --padding: 8rem;
    }
  }

  @media(min-width: 68.75em) {
    :root {
      --padding: 16rem;
    }
  }
`;

export default globalStyles;
