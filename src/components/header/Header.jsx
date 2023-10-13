import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "../navbar/Navigation";
import Hamburger from "./Hamburger";
import Cart from "./Cart";
import Logo from "./Logo";
import PaddingContainer from "../utils/Container";
import HamburgerPortal from "../../portals/HamburgerPortal";
import CartPortal from "../../portals/CartPortal";
import { useHamburger } from "../../context/HamburgerContext";
import { useCart } from "../../context/CartContext";

const HeaderEl = styled.header`
  padding: 3.2rem 0;

  background-color: ${(props) =>
    props.$bgColor ? "var(--light-black)" : "var(--black)"};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  position: relative;
  z-index: 9;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  const location = useLocation();
  const { pathname } = location;

  const { isOpen: hamburgerIsOpen, handleClose: handleHamburgerClose } =
    useHamburger();
  const [headerHeight, setHeaderHeight] = useState(null);

  const { isOpen: cartIsOpen, handleClose: handleCartClose } = useCart();

  const headerRef = useRef(null);

  useEffect(() => {
    if (hamburgerIsOpen) {
      handleHamburgerClose();
    }
  }, [pathname]);

  useEffect(() => {
    if (cartIsOpen) {
      handleCartClose();
    }
  }, [pathname]);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", function () {
      handleHamburgerClose();
      handleCartClose();
    });

    return () => {
      window.removeEventListener("resize", function () {
        handleHamburgerClose();
        handleCartClose();
      });
    };
  }, [handleHamburgerClose, handleCartClose]);

  return (
    <HeaderEl $bgColor={location.pathname === "/"} ref={headerRef}>
      <PaddingContainer>
        <FlexContainer>
          <Hamburger />
          <Logo />
          <Navigation isInHeader />
          <Cart />
        </FlexContainer>
      </PaddingContainer>
      {hamburgerIsOpen && <HamburgerPortal headerHeight={headerHeight} />}
      {cartIsOpen && <CartPortal />}
    </HeaderEl>
  );
}

export default Header;
