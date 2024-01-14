import styled from "styled-components";
import { useHamburger } from "../../context/HamburgerContext";

const HamburgerEl = styled.button`
  border: none;
  background: none;
  outline: none;

  overflow: hidden;

  display: block;
  width: 1.6rem;
  height: 1.6rem;

  cursor: pointer;

  position: relative;

  span {
    position: absolute;
    left: 0;

    display: inline-block;
    width: 100%;
    height: 3px;
    background-color: var(--white);

    transition: all var(--transition-duration) var(--transition-timing-function);
  }

  span:nth-child(1) {
    top: 0;
  }

  span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  span:nth-child(3) {
    bottom: 0;
  }

  @media (min-width: 56.25em) {
    display: none;
  }
`;

function Hamburger() {
  const { isOpen, handleOpen } = useHamburger();

  return (
    <HamburgerEl
      onClick={handleOpen}
      className={isOpen ? "hamburger-is-active" : ""}
    >
      <span></span>
      <span></span>
      <span></span>
    </HamburgerEl>
  );
}

export default Hamburger;
