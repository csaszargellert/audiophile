import styled from "styled-components";
import { useParams } from "react-router-dom";
import { json, useLoaderData, useNavigation } from "react-router-dom";

import PaddingContainer from "../components/utils/Container";
import Categories from "../components/categories/Categories";
import ProductCategories from "../components/categories/ProductCategories";
import { axiosBase } from "../components/utils/axios";
import SpinnerContainer from "../components/utils/SpinnerContainer";
import CurveBars from "../components/spinners/CurveBars";

const NoProducts = styled.p`
  color: var(--black);
  font-size: 3.2rem;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.1rem;
  text-transform: uppercase;

  span {
    color: var(--orange);
  }
`;

const Title = styled.h1`
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  padding: 3.2rem 0;
  margin-bottom: 6.4rem;

  @media (min-width: 37.5em) {
    font-size: 4rem;
    letter-spacing: 0.15rem;

    padding: 10.5rem 0;
    margin-bottom: 12rem;
  }
`;

const CategoriesContainer = styled.div`
  margin-block: 12rem;

  @media (min-width: 56.25em) {
    margin-block: 16rem;
  }
`;

function CategoryPage() {
  const { slug: category } = useParams();
  const productsByCategory = useLoaderData();

  return (
    <>
      <Title>{category}</Title>
      <PaddingContainer>
        {productsByCategory.length > 0 ? (
          <ProductCategories
            products={productsByCategory}
            category={category}
          />
        ) : (
          <NoProducts>
            We are <span>out</span> of <span>stock</span>
          </NoProducts>
        )}
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
      </PaddingContainer>
    </>
  );
}

export default CategoryPage;

export const loader = async function ({ params }) {
  const { slug } = params;

  try {
    const response = await axiosBase({
      url: `/products/categories/${slug}`,
      method: "GET",
    });

    return response.data.data;
  } catch (error) {
    throw json(
      { error: error.response.data.error },
      { status: error.response.status }
    );
  }
};
