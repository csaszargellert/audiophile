import styled from "styled-components";
import {
  json,
  useLoaderData,
  useRouteLoaderData,
  useFetcher,
  useParams,
  redirect,
} from "react-router-dom";

import {
  ButtonGoBack,
  ButtonOrange,
  ButtonWithBorder,
} from "../components/buttons/Button";
import PaddingContainer from "../components/utils/Container";
import Product from "../components/products/Product";
import Categories from "../components/categories/Categories";
import { axiosBase, axiosPrivate } from "../components/utils/axios";

const GoBack = styled(ButtonGoBack)`
  margin-right: auto;
`;

const ButtonDelete = styled(ButtonWithBorder)`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  padding: 3.2rem 0;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  @media (min-width: 34.375em) {
    flex-direction: row;
    align-items: center;

    > div {
      flex-direction: row;
    }
  }

  @media (min-width: 37.5em) {
    flex-direction: row;
    align-items: center;
    padding: 3.2rem 0 2.4rem;

    > div {
      flex-direction: row;
    }
  }

  @media (min-width: 56.25em) {
    padding: 8rem 0 5.6rem;
  }
`;

const CategoriesContainer = styled.div`
  margin-block: 12rem;

  @media (min-width: 68.75em) {
    margin-block: 16rem;
  }
`;

function ProductPage() {
  const product = useLoaderData();
  const { userIsAuthenticated, userRoles, productsId } =
    useRouteLoaderData("root");
  const { productId } = useParams();
  const fetcher = useFetcher();

  let actionButtons;
  if (
    userIsAuthenticated &&
    userRoles.includes("admin") &&
    productsId.includes(productId)
  ) {
    actionButtons = (
      <div>
        <fetcher.Form action={`/products/${productId}/delete`} method="delete">
          <ButtonDelete asEl="button">delete product</ButtonDelete>
        </fetcher.Form>
        <ButtonOrange to={`/products/${productId}/edit`}>
          edit product
        </ButtonOrange>
      </div>
    );
  }

  return (
    <PaddingContainer>
      <ButtonContainer>
        <GoBack />
        {actionButtons}
      </ButtonContainer>
      <Product product={product} />
      <CategoriesContainer>
        <Categories />
      </CategoriesContainer>
    </PaddingContainer>
  );
}

export default ProductPage;

export const loader = async function ({ params }) {
  const { productId } = params;

  try {
    const response = await axiosBase({
      method: "GET",
      url: `/products/${productId}`,
    });

    return response.data.data;
  } catch (error) {
    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }
};

export const action = async function ({ params, request }) {
  const { productId } = params;
  console.log(params);
  try {
    await axiosPrivate({
      method: "DELETE",
      url: `/products/${productId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return redirect("/");
  } catch (error) {
    if (error.response.status === 401) {
      const params = new URLSearchParams();
      params.set("from", new URL(request.url).pathname);
      return redirect("/login?" + params.toString());
    }

    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }
};
