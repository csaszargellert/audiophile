import styled from "styled-components";

import ZElement from "./ZElement";

const ZPatternEl = styled.section`
  margin-block: 12rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (min-width: 37.5em) {
    gap: 3.2rem;
    margin-block: 9.6rem;
  }

  @media (min-width: 56.25em) {
    margin-block: 12rem;
  }
`;

const DUMMY_Z_PATTERN = [
  {
    id: 1,
    name: "zx9 speaker",
    image: `/assets/product-zx9-speaker/image-product.jpg`,
  },
  {
    id: 2,
    name: "zx7 speaker",
    image: `/assets/product-zx7-speaker/image-product.jpg`,
  },
  {
    id: 3,
    name: "yx1 earphones",
    image: `/assets/product-yx1-earphones/image-product.jpg`,
  },
];

function ZPattern({ data }) {
  return (
    <ZPatternEl>
      {data.length > 0 &&
        data.map((el, index) => {
          return (
            <ZElement
              key={el.id}
              index={index}
              image={el.image}
              name={el.name}
              category={el.category}
              id={el.id}
            />
          );
        })}
    </ZPatternEl>
  );
}

export default ZPattern;
