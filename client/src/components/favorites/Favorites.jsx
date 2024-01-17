import styled from 'styled-components';

import Favorite from './Favorite';

const FavoritesEl = styled.article`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr)); */
  grid-template-columns: 1fr;
  gap: 4.8rem;

  @media (min-width: 35.625em) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2.4rem;
  }

  @media (min-width: 46.875em) {
    column-gap: 4.8rem;
  }

  @media (min-width: 65.625em) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3.2rem;
  }
`;

function Favorites({ favorites }) {
  return (
    <FavoritesEl>
      {favorites.map((favorite) => {
        return (
          <Favorite
            key={favorite.id}
            isNew={favorite.isNew}
            category={favorite.category}
            image={favorite.image}
            name={favorite.name}
            id={favorite.id}
            placeholder={favorite.placeholderImage}
          />
        );
      })}
    </FavoritesEl>
  );
}

export default Favorites;
