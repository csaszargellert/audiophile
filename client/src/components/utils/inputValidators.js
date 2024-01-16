import {
  LOGIN_FIELDS,
  REGISTER_FIELDS,
  PRODUCT_FIELDS,
  CATEGORY_ENUM,
  IMAGE_TYPES_ENUM,
} from './constants';

const emailValidator = function (value) {
  let hasError = false;
  let error = '';

  if (!value.trim()) {
    hasError = true;
    error = 'Must not be empty';
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    hasError = true;
    error = 'Invalid email';
  } else {
    hasError = false;
    error = '';
  }

  return { hasError, error };
};

const passwordValidator = function (value) {
  let hasError = false;
  let error = '';

  if (!value.trim()) {
    hasError = true;
    error = 'Must not be empty';
  } else if (!/[$&+,:;=?@#|'<>\.\-\^*()%!\.]/.test(value)) {
    hasError = true;
    error = 'Must contain 1 special character';
  } else if (!/[0-9]/.test(value)) {
    hasError = true;
    error = 'Must contain 1 number';
  } else if (!/[a-z]/.test(value)) {
    hasError = true;
    error = 'Must contain 1 lowercase letter';
  } else if (!/[A-Z]/.test(value)) {
    hasError = true;
    error = 'Must contain 1 uppercase letter';
  } else if (value.length < 8) {
    hasError = true;
    error = 'Min. 8 characters';
  } else {
    hasError = false;
    error = '';
  }

  return { hasError, error };
};

const categoryValidator = function (value) {
  let hasError = false;
  let error = '';

  if (!CATEGORY_ENUM.includes(value.toLowerCase())) {
    hasError = true;
    error = 'Pick one of the options';
  } else {
    hasError = false;
    error = '';
  }

  return { hasError, error };
};

const descriptionValidator = function (value) {
  let hasError = false;
  let error = '';

  if (!value.trim()) {
    hasError = true;
    error = 'Must not be empty';
  } else {
    hasError = false;
    error = '';
  }

  return { hasError, error };
};

const nameValidator = function (value) {
  let hasError = false;
  let error = '';

  if (!value.trim()) {
    hasError = true;
    error = 'Must not be empty';
  } else {
    hasError = false;
    error = '';
  }

  return { hasError, error };
};

const priceValidator = function (value) {
  let hasError = false;
  let error = '';

  const parsedValue = parseInt(value, 10);

  if (!value) {
    hasError = true;
    error = 'Must not be empty';
  } else if (isNaN(parsedValue)) {
    hasError = true;
    error = 'Must be number';
  } else if (parsedValue < 1) {
    hasError = true;
    error = 'Invalid price';
  } else {
    hasError = false;
    error = '';
  }
  return { hasError, error };
};

const imageValidator = function (value) {
  let hasError = false;
  let error = '';

  if (!value) {
    hasError = true;
    error = 'Image must be provided';
  } else if (
    !IMAGE_TYPES_ENUM.some((mimeType) => value.type.includes(mimeType))
  ) {
    hasError = true;
    error = `Image must be of type ${IMAGE_TYPES_ENUM.join(', ')}`;
  } else {
    hasError = false;
    error = '';
  }

  return { hasError, error };
};

const galleryValidator = function (fileList) {
  let hasError = false;
  let error = '';

  if (fileList.length !== 3) {
    error = 'You have to provide 3 images';
    hasError = true;
  }

  for (const fileItem of fileList) {
    if (
      !IMAGE_TYPES_ENUM.some((mimeType) => fileItem.type.includes(mimeType))
    ) {
      hasError = true;
      error = `Image must be of type ${IMAGE_TYPES_ENUM.join(', ')}`;
      return;
    }
  }

  return { hasError, error };
};

export const validateInput = function (name, value) {
  switch (name) {
    case LOGIN_FIELDS.EMAIL:
      return emailValidator(value);
    case LOGIN_FIELDS.PASSWORD:
      return passwordValidator(value);
    case PRODUCT_FIELDS.CATEGORY:
      return categoryValidator(value);
    case PRODUCT_FIELDS.DESCRIPTION:
      return descriptionValidator(value);
    case PRODUCT_FIELDS.IMAGE:
      return imageValidator(value);
    case PRODUCT_FIELDS.PRICE:
      return priceValidator(value);
    case PRODUCT_FIELDS.NAME:
    case REGISTER_FIELDS.USERNAME:
      return nameValidator(value);
    case PRODUCT_FIELDS.GALLERY:
      return galleryValidator(value);
    case PRODUCT_FIELDS.FEATURES:
      return { error: '', hasError: false };
    default:
      return;
  }
};
