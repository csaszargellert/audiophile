import styled from "styled-components";

import { ButtonArrow } from "../buttons/Button";

const LinkContainer = styled.div``;

const CategoryEl = styled.figure`
  width: 100%;
  padding-top: 8.8rem;
  padding-bottom: 2.2rem;
  border-radius: 0.8rem;

  background-color: var(--grey);
  display: grid;
  place-items: center;
  position: relative;

  img {
    display: block;
    height: 13rem;

    position: absolute;
    top: 0;
    left: 50%;

    transform: translate(-50%, -40%);
  }

  p {
    color: var(--black);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.1071rem;
    text-transform: uppercase;
    margin-bottom: 1.7rem;
  }

  ${LinkContainer} {
    display: flex;
    justify-content: center;
  }
`;

function Category({ category, image }) {
  return (
    <CategoryEl>
      <img src={image} alt={category} />
      <figcaption>
        <p>{category}</p>
        <LinkContainer>
          <ButtonArrow to={`/categories/${category}`} />
        </LinkContainer>
      </figcaption>
    </CategoryEl>
  );
}

export default Category;
