import styled from "styled-components";

import Category from "./Category";

const DUMMY_CATEGORIES = [
  {
    id: 1,
    category: "headphones",
    image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
  },
  {
    id: 2,
    category: "speakers",
    image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
  },
  {
    id: 3,
    category: "earphones",
    image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
  },
];

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.8rem;

  @media (min-width: 37.5em) {
    flex-direction: row;
    gap: 1rem;
  }
`;

function Categories() {
  return (
    <FlexContainer>
      {DUMMY_CATEGORIES.map((category) => {
        return (
          <Category
            key={category.id}
            category={category.category}
            image={category.image}
          />
        );
      })}
    </FlexContainer>
  );
}

export default Categories;
