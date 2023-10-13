export const validateForm = function (state, name = "", hasError = true) {
  let isFormValid = true;

  Object.keys(state).forEach((fieldName) => {
    const field = state[fieldName];

    if (fieldName === name && hasError) {
      isFormValid = false;
      return;
    }

    if (fieldName !== name && fieldName !== "isFormValid" && !field.isTouched) {
      isFormValid = false;
      return;
    }

    if (fieldName !== name && fieldName !== "isFormValid" && field.hasError) {
      isFormValid = false;
      return;
    }
  });

  return isFormValid;
};
