import styled from "styled-components";

const FormErrorEl = styled.p`
  padding: var(--padding);

  width: max-content;
  display: inline-block;

  &:not(:last-of-type) {
    margin-bottom: 1.2rem;
    margin-right: 1.2rem;
  }

  &:last-of-type {
    margin-bottom: 3.2rem;
  }

  color: var(--red);
  background-color: var(--light-red);

  border-radius: var(--border-radius);
`;

function FormError({ children }) {
  return <FormErrorEl>{children}</FormErrorEl>;
}

export default FormError;
