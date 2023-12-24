import styled from "styled-components";

const Title = styled.h1`
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  padding: 3.2rem 0;
  margin-bottom: 6.4rem;

  @media (min-width: 37.5em) {
    font-size: 4rem;
    letter-spacing: 0.15rem;

    padding: 10.5rem 0;
    margin-bottom: 12rem;
  }
`;

function PageTitle({ children }) {
  return <Title>{children}</Title>;
}

export default PageTitle;
