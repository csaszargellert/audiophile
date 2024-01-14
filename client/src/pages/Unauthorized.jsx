import styled from "styled-components";

import { ButtonWithBorder } from "../components/buttons/Button";
import PaddingContainer from "../components/utils/Container";

const SectionDenied = styled.section`
  min-height: 100vh;
  background-image: linear-gradient(var(--light-black) 75%, var(--orange) 75%);
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: max-content;
  width: 100%;

  h1 {
    font-size: 6.4rem;
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

const ButtonDenied = styled(ButtonWithBorder)`
  color: var(--orange);
  border: 1px solid var(--orange);

  &:hover {
    color: var(--black);
    background-color: var(--orange);
  }
`;

function UnauthorizedPage() {
  return (
    <SectionDenied>
      <PaddingContainer>
        <FlexContainer>
          <Content>
            <h1>403</h1>
            <p>Your access to this page is prohibited</p>
            <ButtonDenied to={-1} replaceAtt={true}>
              go back
            </ButtonDenied>
          </Content>
        </FlexContainer>
      </PaddingContainer>
    </SectionDenied>
  );
}

export default UnauthorizedPage;
