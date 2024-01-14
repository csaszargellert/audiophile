import styled from "styled-components";

const No = styled.p`
  color: var(--black);
  font-size: 3.2rem;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.1rem;

  text-transform: uppercase;

  span {
    color: var(--orange);
  }
`;

function Negate({ children }) {
  return <No>{children}</No>;
}

export default Negate;
