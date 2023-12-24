import styled, { css } from "styled-components";

import ImageContainer from "../utils/ImageContainer";
import { ButtonArrow } from "../buttons/Button";
import { useFavorites } from "../../context/FavoritesContext";

const FavoriteImage = styled(ImageContainer)`
  width: 100%;
  height: 14rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  img {
    object-position: center;
  }

  @media (min-width: 28.125em) {
    height: 16rem;
  }

  @media (min-width: 65.625em) {
    height: 20rem;
  }
`;

const Figure = styled.figure`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  /* display: ${(props) => (props.$isDisliked ? "none" : "block")}; */
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
`;

const Caption = styled.figcaption`
  color: rgba(0, 0, 0, 0.5);
  padding: 1.2rem 2rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
  }

  div:not(:last-child) {
    margin-bottom: 0.8rem;
  }

  p {
    text-transform: capitalize;
    letter-spacing: 0.125px;
  }

  span {
    color: var(--orange);
    font-size: 1.2rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  h4 {
    color: var(--black);
    font-size: 1.6rem;
    letter-spacing: 0.25px;
    font-weight: 500;
  }

  @media (min-width: 28.125em) {
    padding: 3.2rem 2.4rem 2.4rem;
  }

  @media (min-width: 35.625em) {
    padding: 1.6rem;
  }

  @media (min-width: 46.875em) {
    padding: 3.2rem 2.4rem;
  }

  @media (min-width: 65.625em) {
    padding: 3.2rem;
  }
`;

function Favorite({ image, name, category, isNew, id }) {
  const { checkIsFavorite } = useFavorites();

  return (
    <Figure $isDisliked={!checkIsFavorite(id)}>
      <FavoriteImage id={id}>
        <img src={image} alt={name} />
      </FavoriteImage>
      <Caption>
        <div>
          <p>{category}</p>
          {isNew && <span>new product</span>}
        </div>
        <div>
          <h4>{name}</h4>
          <ButtonArrow to={`/products/${id}`}>check</ButtonArrow>
        </div>
      </Caption>
    </Figure>
  );
}

export default Favorite;
