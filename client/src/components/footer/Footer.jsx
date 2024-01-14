import styled from "styled-components";

import Navigation from "../navbar/Navigation";
import Logo from "../header/Logo";
import PaddingContainer from "../utils/Container";
import SocialMedia from "./SocialMedia";

const FooterEl = styled.footer`
  padding: 5.2rem 0 3.8rem;
  background-color: var(--light-black);
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 10rem;
    height: 0.4rem;
    background-color: var(--orange);

    position: absolute;
    left: 50%;
    top: 0;

    transform: translateX(-50%);
  }

  @media (min-width: 37.5em) {
    padding: 6rem 0 4.6rem;

    &::before {
      left: var(--padding);
      transform: translateX(0);
    }
  }
`;

const HeaderEl = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.8rem;

  margin-bottom: 4.8rem;

  @media (min-width: 37.5em) {
    align-items: flex-start;
    gap: 3.2rem;
    margin-bottom: 3.2rem;
  }

  @media (min-width: 56.25em) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3.6rem;
  }
`;

const GridContainer = styled.div`
  --gap: 4.8rem;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  row-gap: var(--gap);

  p {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
    line-height: 1.667;
    text-align: center;
  }

  p:last-of-type {
    font-weight: 700;
  }

  @media (min-width: 37.5em) {
    --gap: 8rem;

    grid-template-columns: 7fr 5fr;
    justify-items: stretch;
    align-items: center;

    p {
      text-align: left;
    }

    p:first-child {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 56.25em) {
    --gap: 5.6rem;

    p:first-child {
      grid-column: 1 / 2;
    }

    p:last-of-type {
      grid-row: 2 / 3;
    }
  }

  @media (min-width: 68.75em) {
    grid-template-columns: 0.9fr 1fr;
  }
`;

function Footer() {
  return (
    <FooterEl>
      <PaddingContainer>
        <HeaderEl>
          <Logo />
          <Navigation />
        </HeaderEl>
        <GridContainer>
          <p>
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>

          <p>Copyright 2021. All Rights Reserved</p>
          <SocialMedia />
        </GridContainer>
      </PaddingContainer>
    </FooterEl>
  );
}

export default Footer;
