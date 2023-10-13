import styled from "styled-components";

import { STEP } from "../utils/constants";

const Input = styled.input.attrs({
  type: "number",
  min: 1,
  id: "number",
  name: "number",
  step: 1,
  readOnly: true,
})`
  background: none;
  outline: none;
  border: none;

  width: 2.7rem;

  -moz-appearance: textfield;
  color: var(--black);
  text-align: center;
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 700;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (min-width: 56.25em) {
    width: 4.7em;
  }
`;

const InputContainer = styled.div`
  background-color: var(--grey);
  display: flex;
  width: max-content;

  button {
    border: none;
    outline: none;
    background: none;
    padding: 1.5rem;

    color: rgba(0, 0, 0, 0.25);
    text-align: center;
    font-family: inherit;
    font-size: 1.3rem;
    font-weight: 700;

    cursor: pointer;

    transition: color var(--transition-duration)
      var(--transition-timing-function);

    &:hover {
      color: var(--orange);
    }
  }
`;

function NumberInput({ amount, handleAmount, className }) {
  const handleClick = function (event) {
    const currentButton = event.target;
    const step = currentButton.dataset.step;

    let amountValue = amount;

    if (step === STEP.DECREMENT) {
      amountValue = amountValue === 1 ? 1 : amountValue - 1;
    } else if (step === STEP.INCREMENT) {
      amountValue = amountValue + 1;
    }

    handleAmount(amountValue);
  };

  return (
    <InputContainer className={className}>
      <button data-step={STEP.DECREMENT} onClick={handleClick}>
        -
      </button>
      <Input value={amount || 1} />
      <button data-step={STEP.INCREMENT} onClick={handleClick}>
        +
      </button>
    </InputContainer>
  );
}

export default NumberInput;
