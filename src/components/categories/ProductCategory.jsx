import styled from "styled-components";

import { ButtonOrange } from "../buttons/Button";
import ImageContainer from "../utils/ImageContainer";

const Product = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  figcaption {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    text-align: center;
  }

  h3 {
    color: var(--black);
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-transform: uppercase;

    display: flex;
    flex-direction: column;
  }

  p {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    line-height: 1.66;
  }

  @media (min-width: 37.5em) {
    h3 {
      font-size: 4rem;
      letter-spacing: 0.15rem;
      line-height: 1;
      margin-bottom: 0.8rem;
    }
  }

  @media (min-width: 56.25em) {
    flex-direction: row;
    align-items: center;
    gap: 6rem;

    figcaption {
      align-items: flex-start;
      text-align: left;
      gap: 3.2rem;
      order: ${(props) => (props.$isOdd ? "-1" : "0")};
    }

    p {
      margin-bottom: 0.8rem;
    }
  }

  @media (min-width: 68.75em) {
    gap: 10rem;
  }
`;

const ImageContainerEl = styled(ImageContainer)`
  width: 100%;
  height: 35.2rem;

  @media (min-width: 56.25em) {
    /* width: 50%; */
    height: 56rem;
  }
`;

const NewProduct = styled.span`
  display: inline-block;
  color: var(--orange);
  font-size: 1.4rem;
  letter-spacing: 1rem;
  text-transform: uppercase;

  @media (min-width: 37.5em) {
    margin-bottom: -0.8rem;
  }

  @media (min-width: 56.25em) {
    margin-bottom: -1.6rem;
  }
`;

function ProductCategory({
  image,
  name,
  category,
  description,
  isNew,
  id,
  index,
}) {
  return (
    <Product $isOdd={index % 2}>
      <ImageContainerEl id={id}>
        <img src={image} alt={name} />
      </ImageContainerEl>
      <figcaption>
        {isNew && <NewProduct>new product</NewProduct>}
        <h3>
          <span>{name}</span>
          <span>{category}</span>
        </h3>
        <p>{description}</p>
        <ButtonOrange to={`/products/${id}`}>see product</ButtonOrange>
      </figcaption>
    </Product>
  );
}

export default ProductCategory;
