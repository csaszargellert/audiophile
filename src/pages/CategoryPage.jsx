import styled from "styled-components";
import { useParams } from "react-router-dom";
import { json, useLoaderData } from "react-router-dom";

import PaddingContainer from "../components/utils/Container";
import Categories from "../components/categories/Categories";
import ProductCategories from "../components/categories/ProductCategories";
import { axiosBase } from "../components/utils/axios";
import PageTitle from "../components/PageTitle";
import Negate from "../components/Negate";

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
      <PageTitle>{category}</PageTitle>
      <PaddingContainer>
        {productsByCategory.length > 0 ? (
          <ProductCategories
            products={productsByCategory}
            category={category}
          />
        ) : (
          <Negate>
            We are <span>out</span> of <span>stock</span>
          </Negate>
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
