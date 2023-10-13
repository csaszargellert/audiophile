export const STEP = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};

export const CATEGORY_ENUM = ["speakers", "earphones", "headphones"];
export const IMAGE_TYPES_ENUM = ["png", "jpeg", "jpg"];

export const ACTION = {
  UPDATE_FORM: "UPDATE_FORM",
};

export const NUMBER_OF_BARS = 5;
export const COLOR_PALETTE = [
  "#4C0100",
  "#6C2200",
  "#8F400F",
  "#B35E2D",
  "#D87D4A",
];

export const LOGIN_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
};

export const INITIAL_LOGIN_STATE = {
  [LOGIN_FIELDS.EMAIL]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  [LOGIN_FIELDS.PASSWORD]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  isFormValid: false,
};

export const PRODUCT_FIELDS = {
  NAME: "name",
  CATEGORY: "category",
  DESCRIPTION: "description",
  PRICE: "price",
  IMAGE: "image",
  GALLERY: "gallery",
  FEATURES: "features",
};

export const INITIAL_PRODUCT_STATE = {
  [PRODUCT_FIELDS.NAME]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  [PRODUCT_FIELDS.CATEGORY]: {
    value: CATEGORY_ENUM[0],
    error: "",
    hasError: false,
    isTouched: true,
  },
  [PRODUCT_FIELDS.DESCRIPTION]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  [PRODUCT_FIELDS.PRICE]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  [PRODUCT_FIELDS.FEATURES]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  [PRODUCT_FIELDS.GALLERY]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  [PRODUCT_FIELDS.IMAGE]: {
    value: "",
    error: "",
    hasError: false,
    isTouched: false,
  },
  isFormValid: false,
};

export const REDUCER = function (state, action) {
  switch (action.payload) {
    case ACTION.UPDATE_FORM: {
      const { name, value, isFormValid, hasError, error, isTouched } =
        action.field;

      return {
        ...state,
        [name]: {
          ...state[name],
          value,
          hasError,
          error,
          isTouched,
        },
        isFormValid,
      };
    }
    default:
      return state;
  }
};
