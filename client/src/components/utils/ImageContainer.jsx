import styled from 'styled-components';
import { useState } from 'react';

import { useFavorites } from '../../context/FavoritesContext';

import { toast } from 'react-toastify';

const ImageContainerEl = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

function ImageContainer({ children, className, id }) {
  const { addFavorite, removeFavorite, checkIsFavorite } = useFavorites();
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

  return (
    <ImageContainerEl className={className}>
      <button onClick={notify}>
        <svg className={`icon icon-heart ${isFavorite && 'full'}`}>
          <use xlinkHref="/assets/symbol-defs.svg#icon-heart"></use>
        </svg>
      </button>
      {children}
    </ImageContainerEl>
  );
}

export default ImageContainer;
