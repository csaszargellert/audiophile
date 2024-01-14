import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PaddingContainer from '../components/utils/Container';
import { ButtonBlack } from '../components/buttons/Button';

const FlexContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  p {
    display: block;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 4.8rem;
    margin-bottom: 3.2rem;
  }

  span {
    color: var(--red);
  }
`;

function CancelPage() {
  return (
    <PaddingContainer>
      <FlexContainer>
        <div>
          <p>
            Order
            <span>canceled</span>
          </p>

          <ButtonBlack to="/">keep shopping</ButtonBlack>
        </div>
      </FlexContainer>
    </PaddingContainer>
  );
}

export default CancelPage;
