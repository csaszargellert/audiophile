import styled from "styled-components";
import { useRouteError } from "react-router-dom";

import { ButtonWithBorder } from "../components/buttons/Button";
import PaddingContainer from "../components/utils/Container";

const Error = styled.section`
  min-height: 100vh;
  background-image: linear-gradient(var(--light-black) 75%, var(--orange) 75%);
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ErrorContent = styled.div`
  max-width: max-content;
  width: 100%;

  h1 {
    font-size: 4.8rem;
    line-height: 1;
    margin-bottom: 1.2rem;
    color: var(--orange);
  }

  p {
    font-size: 3.2rem;
    line-height: 1;
    margin-bottom: 4.8rem;
    color: var(--orange);
  }
`;

const ButtonError = styled(ButtonWithBorder)`
  color: var(--orange);
  border: 1px solid var(--orange);

  &:hover {
    color: var(--black);
    background-color: var(--orange);
  }
`;

function ErrorPage() {
  const error = useRouteError();
  console.log(error?.message);
  const errorStatus = error?.status || 500;
  const errorMessage = error?.data?.error || error.statusText || error.message;

  return (
    <Error>
      <PaddingContainer>
        <FlexContainer>
          <ErrorContent>
            <h1>{errorStatus}</h1>
            <p>Ooops, {errorMessage.toLowerCase()}.</p>
            <ButtonError to="/">take me home</ButtonError>
          </ErrorContent>
        </FlexContainer>
      </PaddingContainer>
    </Error>
  );
}

export default ErrorPage;
