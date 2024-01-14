import styled from "styled-components";
import { json, redirect } from "react-router-dom";

import AuthProvider from "../components/utils/auth";
import { axiosPrivate } from "../components/utils/axios";
import PaddingContainer from "../components/utils/Container";
import Product from "../components/utils/product";
import ProductForm from "../components/forms/ProductForm";
import { validateForm } from "../components/utils/overallFormValidator";

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

function AddProduct() {
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

export default AddProduct;

export const action = async function ({ request }) {
  const formData = await request.formData();

  try {
    const response = await axiosPrivate({
      method: "POST",
      headers: {
        "Content-Type": "multipart/formdata",
      },
      data: formData,
      url: "/products/create",
    });

    const createdProduct = response.data.data;
    AuthProvider.productsId = [...AuthProvider.productsId, createdProduct.id];
    return redirect(`/products/${createdProduct.id}`);
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

export const loader = function () {
  const product = Product.Instance;
  if (product.IsEmpty()) return null;

  const serializedProduct = getDataFrom(product, "ADD");
  product.Clear();
  return serializedProduct;
};

export function saveDataInto(product, formData) {
  for (const [key, value] of formData.entries()) {
    const convertedKey = convertKey(key);
    product[convertedKey] = value;
  }
}

function convertKey(key) {
  return key[0].toUpperCase() + key.slice(1);
}

export function getDataFrom(product, mode) {
  const productSchema = Object.entries(
    Object.getOwnPropertyDescriptors(product)
  ).reduce((prevValue, currentValue) => {
    const [key, keyValue] = currentValue;
    const { value } = keyValue;
    const realKey = key.slice(1);
    return {
      ...prevValue,
      [realKey]: {
        value: !Array.isArray(value) ? value : value?.length ? value : "",
        error: "",
        hasError: false,
        isTouched: !!value,
      },
    };
  }, {});

  if (mode === "EDIT") {
    productSchema.image = {
      ...productSchema.image,
      isTouched: true,
    };
  }

  productSchema.isFormValid = validateForm(productSchema);
  return productSchema;
}
