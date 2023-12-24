import styled from "styled-components";
import { useState } from "react";

const RatingsContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 1.6rem;
`;

const Rating = styled.label`
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;

  input {
    display: none;
  }

  .icon {
    stroke: var(--orange);
    width: 100%;
    height: 100%;
  }
`;

function Ratings({ ratings, setRatings }) {
  const [hoverRatings, setHoverRatings] = useState(null);

  const handleMouseEnter = function (event) {
    const label = event.target.closest("label");
    const currentRating = +label.querySelector("input").dataset.value;
    setHoverRatings(currentRating);
  };

  return (
    <RatingsContainer>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <Rating key={index}>
            <input
              type="radio"
              name="ratings"
              value={ratings}
              data-value={currentRating}
              onChange={(event) => {
                console.log();
                setRatings(event.target.dataset.value);
              }}
            />
            <svg
              className="icon icon-star-full"
              style={{
                fill:
                  currentRating <= (hoverRatings || ratings)
                    ? "var(--orange)"
                    : "none",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setHoverRatings(null)}
            >
              <use xlinkHref="/assets/symbol-defs.svg#icon-star-full"></use>
            </svg>
          </Rating>
        );
      })}
    </RatingsContainer>
  );
}

export default Ratings;
