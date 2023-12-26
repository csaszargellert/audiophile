import styled from "styled-components";

import PaddingContainer from "../utils/Container";
import ImageContainer from "../utils/ImageContainer";

const CTA_El = styled.section`
  margin-bottom: 12rem;

  figure {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  h3 {
    color: var(--black);
    text-align: center;
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    margin-bottom: 3.2rem;
    line-height: 1.1;
    span {
      color: var(--orange);
    }
  }

  p {
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-weight: 500;
    line-height: 1.6;
  }

  @media (min-width: 33.125em) {
    h3 {
      width: 80%;
    }

    figcaption {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (min-width: 37.5em) {
    figure {
      gap: 6.4rem;
    }

    h3 {
      font-size: 4rem;
    }

    p {
      width: 85%;
    }
  }

  @media (min-width: 56.25em) {
    figure {
      flex-direction: row;
      gap: 6rem;
      align-items: center;
    }

    figcaption {
      order: -1;
      align-items: flex-start;
    }

    h3 {
      text-align: left;
      width: 100%;
    }

    p {
      text-align: left;
      width: 100%;
    }
  }

  @media (min-width: 68.75em) {
    figure {
      gap: 10rem;
    }
  }

  @media (min-width: 75em) {
    h3 {
      width: 90%;
    }

    p {
      width: 90%;
    }
  }
`;

const ImageContainerEl = styled(ImageContainer)`
  width: 100%;
  height: 30rem;

  button {
    display: none;
  }

  @media (min-width: 56.25em) {
    height: 58.8rem;
    flex: 1 0 45%;
  }
`;

function CallToAction() {
  return (
    <CTA_El>
      <PaddingContainer>
        <figure>
          <ImageContainerEl>
            <img
              src="/assets/shared/tablet/image-best-gear.jpg"
              alt="Headphones"
              loading="lazy"
            />
          </ImageContainerEl>

          <figcaption>
            <h3>
              bringing you the <span>best</span> audio gear
            </h3>
            <p>
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </figcaption>
        </figure>
      </PaddingContainer>
    </CTA_El>
  );
}

export default CallToAction;
