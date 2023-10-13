import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSubmit, useActionData, useLoaderData } from "react-router-dom";

import {
  INITIAL_PRODUCT_STATE,
  REDUCER,
  CATEGORY_ENUM,
} from "../utils/constants";
import useInput from "../../hooks/useInput";
import Input from "../inputs/Input";
import FileInput from "../inputs/FileInput";
import { ButtonBlack, ButtonWithBorder } from "../buttons/Button";
import FormError from "./FormError";
import SelectInput from "../inputs/SelectInput";

const Form = styled.form`
  max-width: 40rem;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin-bottom: 4rem;
`;

const ButtonController = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SubmitButton = styled(ButtonBlack)`
  border-radius: var(--border-radius);
`;

const CancelButton = styled(ButtonWithBorder)`
  border-radius: var(--border-radius);
`;

function ProductForm() {
  const data = useLoaderData();
  const error = useActionData();
  const submit = useSubmit();
  const [productFormError, setProductFormError] = useState();
  const { state, handleInput } = useInput(
    REDUCER,
    data ? data : INITIAL_PRODUCT_STATE
  );

  useEffect(() => {
    if (error) {
      setProductFormError(error);
    }
  }, [error]);

  const handleSubmit = function (event) {
    event.preventDefault();

    if (state.isFormValid) {
      const formData = new FormData();

      for (const fieldName in state) {
        if (fieldName === "gallery") {
          for (const file of state[fieldName].value) {
            formData.append(fieldName, file);
          }
          continue;
        }

        if (fieldName !== "isFormValid") {
          formData.append(fieldName, state[fieldName].value);
        }
      }
      submit(formData, { method: "POST", encType: "multipart/form-data" });
    } else {
      setProductFormError("You are missing something");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>create new product</h1>
      {productFormError &&
        productFormError.split(", ").map((errEl, index) => {
          return <FormError key={index}>{errEl}</FormError>;
        })}
      <InputContainer>
        <Input
          type="text"
          id="name"
          name="name"
          inputState={state.name}
          handleInput={handleInput}
        >
          Name
        </Input>
        <SelectInput
          options={CATEGORY_ENUM}
          handleInput={handleInput}
          inputState={state.category}
          name="category"
        >
          Category
        </SelectInput>
        <Input
          type="textarea"
          id="description"
          name="description"
          inputState={state.description}
          handleInput={handleInput}
        >
          Description
        </Input>
        <Input
          type="number"
          id="price"
          name="price"
          inputState={state.price}
          handleInput={handleInput}
        >
          Price ($)
        </Input>
        <FileInput
          id="image"
          name="image"
          inputState={state.image}
          handleInput={handleInput}
          accept="image/jpg, image/png, image/jpeg"
          amount={1}
        >
          Image
        </FileInput>
        <Input
          type="textarea"
          id="features"
          name="features"
          inputState={state.features}
          handleInput={handleInput}
        >
          Features
        </Input>
        <FileInput
          id="gallery"
          name="gallery"
          inputState={state.gallery}
          handleInput={handleInput}
          accept="image/jpg, image/png, image/jpeg"
          multiple
          amount={3}
        >
          Gallery
        </FileInput>
      </InputContainer>
      <ButtonController>
        <SubmitButton asEl="button">add product</SubmitButton>
        <CancelButton to={-1}>cancel</CancelButton>
      </ButtonController>
    </Form>
  );
}

export default ProductForm;
