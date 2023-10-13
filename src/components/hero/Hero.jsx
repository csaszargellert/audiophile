import styled from "styled-components";

import PaddingContainer from "../utils/Container";
import { ButtonOrange } from "../buttons/Button";

const HeroEl = styled.section`
  background-color: rgba(16, 16, 16, 0.5);
  background-image: url(/assets/home/tablet/image-header.jpg);
  background-blend-mode: overlay;
  background-position: bottom center;
  background-size: cover;
  background-repeat: no-repeat;

  padding: 10.8rem 0 11.2rem;
  margin-bottom: 9.2rem;

  span {
    display: block;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    font-size: 1.4rem;
    letter-spacing: 1rem;
    text-transform: uppercase;

    margin-bottom: 1.6rem;
  }

  h1 {
    color: var(--white);
    text-align: center;
    font-size: 3.6rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0.1286rem;
    text-transform: uppercase;
    margin-bottom: 2.4rem;
  }

  p {
    color: rgba(255, 255, 255, 0.75);
    text-align: center;
    font-weight: 500;
    line-height: 1.66;
    margin-bottom: 2.8rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 37.5em) {
    padding: 12.6rem 0 16.7rem;

    span {
      margin-bottom: 2.4rem;
    }

    h1 {
      font-size: 5.8rem;
      line-height: 1;
    }

    p {
      width: 60%;
      margin-bottom: 4rem;
    }
  }

  @media (min-width: 56.25em) {
    padding: 12.6rem 0;
    background-image: url(/assets/home/desktop/image-header.jpg);
    background-position: bottom center;
    margin-bottom: 12rem;

    .content {
      align-items: flex-start;
    }

    span {
      text-align: left;
    }

    h1 {
      width: 60%;
      text-align: left;
      font-size: 4.8rem;
    }

    p {
      text-align: left;
      width: 50%;
    }
  }

  @media (min-width: 68.75em) {
    padding: 12.6rem 0 16rem;

    h1 {
      width: 50%;
      font-size: 5.6rem;
    }

    p {
      width: 40%;
    }
  }
`;

function Hero() {
  return (
    <HeroEl>
      <PaddingContainer>
        <div className="content">
          <span>new product</span>
          <h1>XX99 Mark II HeadphoneS</h1>
          <p>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <ButtonOrange to={`/products/650f5e35a767392d5df5e1c5`}>
            see product
          </ButtonOrange>
        </div>
      </PaddingContainer>
    </HeroEl>
  );
}

export default Hero;
