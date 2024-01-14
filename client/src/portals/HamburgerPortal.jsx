import styled from "styled-components";

import Portal from "./Portal";
import PaddingContainer from "../components/utils/Container";
import Navigation from "../components/navbar/Navigation";
import { useHamburger } from "../context/HamburgerContext";

const HamburgerLinksContainer = styled.div`
  padding: 4.8rem 0;
  background-color: var(--white);
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  position: absolute;
  z-index: 999;
  top: ${(props) => props.$height}px;
  left: 0;

  width: 100%;
`;

function HamburgerNavigation({ headerHeight }) {
  const { handleClose } = useHamburger();

  return (
    <Portal handleClick={handleClose}>
      <HamburgerLinksContainer $height={headerHeight}>
        <PaddingContainer>
          <Navigation hamburger={true} />
        </PaddingContainer>
      </HamburgerLinksContainer>
    </Portal>
  );
}

export default HamburgerNavigation;
