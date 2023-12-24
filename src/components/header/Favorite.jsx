import styled from "styled-components";
import { Link } from "react-router-dom";

import DisplayNumber from "./DisplayNumber";
import { useFavorites } from "../../context/FavoritesContext";

const FavoriteLink = styled(Link)`
  display: flex;
  position: relative;
  font-family: inherit;

  .icon-heart {
    stroke-width: 2px;
    stroke: var(--white);
  }
`;

function Favorite() {
  const { favNum } = useFavorites();

  return (
    <FavoriteLink to="/favorites">
      <DisplayNumber>{favNum}</DisplayNumber>
      <svg
        className="icon icon-heart"
        width="23"
        height="20"
        style={{ fill: favNum > 0 ? "var(--white)" : "none" }}
      >
        <use xlinkHref="/assets/symbol-defs.svg#icon-heart"></use>
      </svg>
    </FavoriteLink>
  );
}

export default Favorite;
