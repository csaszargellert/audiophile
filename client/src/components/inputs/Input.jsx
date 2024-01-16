import styled, { css } from 'styled-components';

export const InputEl = styled.input`
  border: none;
  outline: none;
  background: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  width: 100%;
  padding: var(--padding);

  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.025rem;

  color: inherit;

  ${(props) => {
    if (props.$bgIsDark) {
      return css`
        border-bottom: 2px solid
          ${props.$hasError ? 'var(--red)' : 'currentColor'};

        &:focus {
          border-bottom: 2px solid var(--orange);
        }
      `;
    } else {
      return css`
        border: 1px solid
          ${props.$hasError ? 'var(--red)' : 'var(--extra-light-grey)'};
        border-radius: var(--border-radius);
        &:focus {
          border: 1px solid var(--orange);
        }
      `;
    }
  }}

  transition: all var(--transition-duration) var(--transition-timing-function);

  &::placeholder {
    visibility: hidden;
    opacity: 0;
  }
`;

const TextArea = styled(InputEl)`
  display: inline-block;
  height: 10rem;
  resize: none;
`;

export const FormInput = styled.div`
  position: relative;

  color: ${(props) => (props.$bgIsDark ? 'var(--white)' : 'var(--black)')};

  label {
    display: inline-block;
    position: absolute;
    left: var(--padding);

    /* if textarea than label must be at the top */
    ${(props) => {
      if (props.$isTextArea) {
        return css`
          top: 0;
          transform: translateY(50%);
        `;
      } else {
        return css`
          top: 50%;
          transform: translateY(-50%);
        `;
      }
    }}

    font-family: inherit;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.025rem;

    color: ${(props) =>
      props.$hasError
        ? 'var(--red)'
        : props.$bgIsDark
        ? 'inherit'
        : 'rgba(0,0,0,0.4)'};

    transition: all var(--transition-duration) var(--transition-timing-function);
  }

  ${InputEl}:focus + label,
  ${InputEl}:not(:placeholder-shown) + label {
    top: 0;
    left: 0;
    transform: translateY(-100%);
    font-size: 1.2rem;
  }

  ${InputEl}:focus + label {
    color: var(--orange);
  }

  p {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-100%);

    font-size: 1.2rem;
    font-weight: 500;

    text-transform: capitalize;
    text-align: right;

    color: var(--red);
    letter-spacing: -0.0214rem;
  }
`;

function Input({
  type,
  id,
  name,
  children,
  inputState,
  handleInput,
  bgIsDark,
}) {
  let input;
  const isTextArea = type === 'textarea';
  if (isTextArea) {
    input = (
      <TextArea
        $hasError={inputState?.hasError}
        as="textarea"
        id={id}
        name={name}
        placeholder={children}
        onChange={handleInput}
        onBlur={handleInput}
        defaultValue={inputState?.value}
      ></TextArea>
    );
  } else {
    input = (
      <InputEl
        $hasError={inputState?.hasError}
        $bgIsDark={bgIsDark}
        type={type}
        id={id}
        name={name}
        placeholder={children}
        autoComplete="off"
        value={inputState?.value}
        onChange={handleInput}
        onBlur={handleInput}
      />
    );
  }

  return (
    <FormInput
      $hasError={inputState?.hasError}
      $bgIsDark={bgIsDark}
      $isTextArea={isTextArea}
    >
      {input}
      <label htmlFor={id}>{children}</label>
      {inputState?.isTouched && inputState?.hasError && (
        <p>{inputState?.error}</p>
      )}
    </FormInput>
  );
}

export default Input;
