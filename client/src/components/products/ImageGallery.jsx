import styled, { css } from 'styled-components';
import { useState, useRef, useEffect } from 'react';

import Overlay from '../utils/Overlay';

const Gallery = styled.section`
  ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 37.5em) {
    ul {
      grid-template-columns: 2fr 3fr;
    }
  }
`;

const ImageContainer = styled.li`
  width: 100%;
  height: ${(props) => (!props.$isLast ? '20rem' : '36rem')};
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;

  background-image: url('${(props) => props.placeholder}');
  background-size: cover;
  background-position: center;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 250ms ease-in-out;
  }

  &.loaded > img {
    opacity: 1;
  }

  @media (min-width: 31.25em) {
    height: ${(props) => (!props.$isLast ? '25rem' : '36rem')};
  }

  @media (min-width: 37.5em) {
    ${(props) => {
      if (props.$isLast) {
        return css`
          grid-column: 2 / -1;
          grid-row: 1 / 3;
          height: 100%;

          img {
            object-position: center left;
          }
        `;
      } else {
        return css`
          height: 20rem;
          min-height: 100%;
        `;
      }
    }}
  }
`;

function ImageGallery({ gallery, placeholderGallery }) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const imageRef = useRef();

  const handleOnLoad = function () {
    setImageIsLoaded(true);
  };

  useEffect(() => {
    if (imageRef.current.complete) {
      handleOnLoad();
    }
  }, []);

  return (
    <Gallery>
      <ul>
        {gallery.map((galleryImage, index) => {
          return (
            <ImageContainer
              key={index}
              $isLast={index === gallery.length - 1}
              placeholder={placeholderGallery[index]}
              className={`${imageIsLoaded ? 'loaded' : ''}`}
            >
              <Overlay position="absolute" />
              <img onLoad={handleOnLoad} ref={imageRef} src={galleryImage} />
            </ImageContainer>
          );
        })}
      </ul>
    </Gallery>
  );
}

export default ImageGallery;
