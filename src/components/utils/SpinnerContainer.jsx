import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SpinnerContainer({ children }) {
  return <Container>{children}</Container>;
}

export default SpinnerContainer;
