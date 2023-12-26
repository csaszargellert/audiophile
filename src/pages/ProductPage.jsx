import styled from "styled-components";
import {
  json,
  useLoaderData,
  useRouteLoaderData,
  useFetcher,
  useParams,
  redirect,
  useLocation,
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
import AddRating from "../components/comments/AddComment";
import Comments from "../components/comments/Comments";

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

const RatingsSection = styled.section`
  padding: 12rem 0 0;
  color: rgba(0, 0, 0, 0.5);

  h3 {
    color: var(--black);
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.0857rem;
    text-transform: uppercase;
    margin-bottom: 2.4rem;
  }

  h3 + p {
    font-size: 1.8rem;
  }

  @media (min-width: 37.5em) {
    h3 {
      font-size: 3.2rem;
      letter-spacing: 0.11rem;
      margin-bottom: 3.2rem;
    }
  }
`;

const LoginButton = styled(ButtonGoBack)`
  &:link,
  &:visited {
    color: var(--orange);
    text-transform: none;
    font-weight: 700;
    font-size: inherit;
  }
`;

function ProductPage() {
  const product = useLoaderData();
  const { userIsAuthenticated, userRoles, productsId } =
    useRouteLoaderData("root");
  const { productId } = useParams();
  const fetcher = useFetcher();
  const location = useLocation();
  const params = new URLSearchParams();
  params.set("from", location.pathname);

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

      <RatingsSection>
        <h3>ratings</h3>
        {!userIsAuthenticated ? (
          <p>
            {" "}
            In order to rate this product you have to{" "}
            <LoginButton to={"/login?" + params.toString()}>log in</LoginButton>
          </p>
        ) : (
          <AddRating productId={productId} />
        )}
        <Comments comments={product?.comments} />
      </RatingsSection>
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
  const answer = window.confirm("Do you want to delete this product?");
  if (!answer) {
    return null;
  }

  const { productId } = params;

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
