import styled from "styled-components";

const ContainerEl = styled.div`
  padding: 0 var(--padding);
`;

function Container({ children }) {
  return <ContainerEl>{children}</ContainerEl>;
}

export default Container;
