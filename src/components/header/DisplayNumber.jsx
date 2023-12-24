import styled from "styled-components";

const NumberDisplay = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  font-weight: 700;
  /* height: 1rem; */
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(75%, -50%);
  background-color: var(--orange);
  color: var(--white);
`;

function DisplayNumber({ children }) {
  return <NumberDisplay>{children}</NumberDisplay>;
}

export default DisplayNumber;
