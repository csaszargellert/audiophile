import { useReducer } from "react";

import { ACTION } from "../components/utils/constants";
import { validateInput } from "../components/utils/inputValidators";
import { validateForm } from "../components/utils/overallFormValidator";

function useInput(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInput = function (event) {
    const { type: eventType, target } = event;

    const name = target.name || target.dataset.name;
    let value = target.value || target.textContent;

    let isTouched = eventType === "blur";

    if (name === "image") {
      value = target.files.item(0) || state.image.value;
      isTouched = true;
    } else if (name === "gallery") {
      if (target.files.length > 0) {
        value = target.files;
      } else {
        value = state.gallery.value;
      }
      isTouched = true;
    } else if (name === "category") {
      isTouched = true;
    }
    console.log(name, value);
    const { hasError, error } = validateInput(name, value);
    const isFormValid = validateForm(state, name, hasError);

    dispatch({
      payload: ACTION.UPDATE_FORM,
      field: {
        name,
        value,
        hasError,
        error,
        isTouched,
        isFormValid,
      },
    });
  };

  return { state, dispatch, handleInput };
}

export default useInput;
