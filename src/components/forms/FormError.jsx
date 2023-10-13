import styled from "styled-components";

const FormErrorEl = styled.p`
  padding: var(--padding);
  margin-bottom: 1.2rem;

  &:last-of-type {
    margin-bottom: 4rem;
  }

  color: var(--red);
  background-color: var(--light-red);
  border-radius: var(--border-radius);
`;

function FormError({ children }) {
  return <FormErrorEl>{children}</FormErrorEl>;
}

export default FormError;
