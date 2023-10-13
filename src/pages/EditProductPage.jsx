import styled from "styled-components";
import { json, redirect } from "react-router-dom";

import { axiosPrivate, axiosBase } from "../components/utils/axios";
import { saveDataInto, getDataFrom } from "./AddProductPage";
import Product from "../components/utils/product";
import PaddingContainer from "../components/utils/Container";
import ProductForm from "../components/forms/ProductForm";

import { createInitialState } from "../components/utils/createUpdateInitState";

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Section = styled.section`
  --padding: 1.2rem;
  padding: 9.6rem 0;

  h1 {
    color: var(--light-black);
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.025rem;
    text-transform: capitalize;

    margin-bottom: 3.2rem;
  }
`;

function EditProduct() {
  return (
    <PaddingContainer>
      <Section>
        <FlexContainer>
          <ProductForm />
        </FlexContainer>
      </Section>
    </PaddingContainer>
  );
}

export default EditProduct;

export const loader = async function ({ params }) {
  const product = Product.Instance;

  if (!product.IsEmpty()) {
    const serializedProduct = getDataFrom(product, "EDIT");
    product.Clear();

    return serializedProduct;
  }

  const { productId } = params;
  try {
    const response = await axiosBase({
      method: "GET",
      url: `/products/${productId}`,
    });
    const initState = createInitialState(response.data.data);

    return initState;
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

export const action = async function ({ request, params }) {
  const formData = await request.formData();
  const { productId } = params;

  try {
    const response = await axiosPrivate({
      method: "PATCH",
      data: formData,
      url: `/products/${productId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return redirect(`/products/${response.data.data.id}`);
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data.error;
    }

    if (error.response.status === 401) {
      const product = Product.Instance;
      saveDataInto(product, formData);

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
