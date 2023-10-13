import { PRODUCT_FIELDS } from "./constants";

export const createInitialState = function (product) {
  const fields = Object.values(PRODUCT_FIELDS);

  const initialUpdateState = fields.reduce((prevValue, fieldName) => {
    return {
      ...prevValue,
      [fieldName]: {
        value:
          fieldName === "gallery" || fieldName === "image"
            ? ""
            : product[fieldName],
        error: "",
        hasError: false,
        isTouched: true,
      },
    };
  }, {});

  initialUpdateState.isFormValid = true;

  return initialUpdateState;
};
