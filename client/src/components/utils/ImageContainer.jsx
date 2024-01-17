import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

import { useFavorites } from '../../context/FavoritesContext';

import { toast } from 'react-toastify';

const ImageContainerEl = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;

  background-image: url('${(props) => props.$placeholder}');
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

  > button {
    border: none;
    outline: none;
    background: none;

    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 99;

    border-bottom-left-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    width: 2.4rem;
    height: 2.4rem;

    cursor: pointer;
  }

  .icon-heart {
    fill: none;
    stroke: var(--red);

    width: 100%;
    height: 100%;
  }

  .icon-heart.full {
    fill: var(--red);
  }

  use {
    width: 100%;
    height: 100%;
  }
`;

function ImageContainer({ image, className, id, placeholder, name }) {
  const { addFavorite, removeFavorite, checkIsFavorite } = useFavorites();

  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const imageRef = useRef();

  const [isFavorite, setIsFavorite] = useState(checkIsFavorite(id));

  const notify = () => {
    if (!isFavorite) {
      addFavorite(id);
      toast.success('Added to favorites');
    } else {
      removeFavorite(id);
      toast.success('Removed from favorites');
    }
    setIsFavorite((prev) => !prev);
  };

  const handleOnLoad = function () {
    setImageIsLoaded(true);
  };

  useEffect(() => {
    if (imageRef.current.complete) {
      handleOnLoad();
    }
  }, []);

  return (
    <ImageContainerEl
      className={className + ' ' + `${imageIsLoaded ? 'loaded' : ''}`}
      $placeholder={placeholder}
    >
      <button onClick={notify}>
        <svg className={`icon icon-heart ${isFavorite && 'full'}`}>
          <use xlinkHref="/assets/symbol-defs.svg#icon-heart"></use>
        </svg>
      </button>
      <img
        ref={imageRef}
        onLoad={handleOnLoad}
        src={image}
        loading="lazy"
        alt={name}
      />
    </ImageContainerEl>
  );
}

export default ImageContainer;
