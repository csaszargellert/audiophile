import styled, { keyframes, css } from "styled-components";

import { NUMBER_OF_BARS, COLOR_PALETTE } from "../utils/constants";

const ARRAY_OF_BARS = new Array(NUMBER_OF_BARS).fill(null);

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 10rem;
  height: 10rem;
  transform: rotate(135deg);

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;
    border: 6px solid transparent;
    animation: ${rotate} 2s cubic-bezier(0.42, 0.1, 0.47, 0.9) infinite;
  }

  ${(props) => createCss(props.$barsNumber)}
`;

function createCss(barsNumber) {
  let styles = "";

  for (let i = 0; i < barsNumber; i++) {
    styles += `
      div:nth-child(${i + 1}) {
        width: calc(2rem * (${i + 1}));
        height: calc(2rem * (${i + 1}));
        border-top-color: ${COLOR_PALETTE[i]};
        border-right-color: ${COLOR_PALETTE[i]};
        animation-delay: -${i * 500}ms;
      }
    `;
  }

  return css`
    ${styles}
  `;
}

function CurveBars() {
  return (
    <SpinnerContainer $barsNumber={NUMBER_OF_BARS}>
      {ARRAY_OF_BARS.map((el, index) => {
        return <div key={index}></div>;
      })}
    </SpinnerContainer>
  );
}

export default CurveBars;
