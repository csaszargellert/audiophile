import styled from "styled-components";
import { useEffect, useState } from "react";

const Select = styled.div`
  width: 100%;
  position: relative;

  ul {
    position: absolute;
    bottom: -1.2rem;
    left: 0;
    list-style-type: none;

    transform: translateY(100%);

    width: 100%;

    display: flex;
    flex-direction: column;

    background-color: var(--white);
    box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.1),
      0 0.8rem 2.4rem rgba(0, 0, 0, 0.05);

    border-radius: var(--border-radius);
    z-index: 1;
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

const Option = styled.li`
  padding: var(--padding);

  font-size: 1.4rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: -0.025rem;
  cursor: pointer;

  transition: color var(--transition-duration) var(--transition-timing-function);

  &:not(:last-child) {
    border-bottom: 1px solid var(--extra-light-grey);
  }

  &:hover {
    color: var(--orange);
  }
`;

const DisplayBar = styled.button.attrs({ type: "button" })`
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  padding: var(--padding);

  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.025rem;
  text-align: left;

  border: 1px solid
    ${(props) => (props.$hasError ? "var(--red)" : "var(--extra-light-grey)")};
  border-radius: var(--border-radius);
  cursor: pointer;

  transition: all var(--transition-duration) var(--transition-timing-function);

  &:focus {
    border: 1px solid var(--orange);
  }

  &::before {
    content: "";
    display: inline-block;

    position: absolute;
    top: 50%;
    right: var(--padding);

    transform: ${(props) =>
      !props.$dropdownIsOpen
        ? "translateY(-25%)"
        : "translateY(20%) rotate(180deg)"};
    transform-origin: top;

    border: 6px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.4);

    transition: all var(--transition-duration) var(--transition-timing-function);
  }

  &:focus::before {
    border-top-color: var(--orange);
  }

  span {
    text-transform: capitalize;
  }
`;

const Title = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);

  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) =>
    props.$hasError
      ? "var(--red)"
      : props.$hasFocus
      ? "var(--orange)"
      : "rgba(0, 0, 0, 0.4)"};

  transition: all var(--transition-duration) var(--transition-timing-function);
`;

function SelectInput({ children, options, handleInput, inputState, name }) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [displayBarHasFocus, setDisplayBarHasFocus] = useState(false);

  const handleDropdown = function () {
    setDropdownIsOpen((prevValue) => !prevValue);
  };

  const handleFocus = function () {
    setDisplayBarHasFocus((prevFocus) => !prevFocus);
  };

  const { value, hasError, isTouched, error } = inputState;

  useEffect(() => {
    handleDropdown();
  }, [value]);

  return (
    <Select>
      <Title $hasError={hasError} $hasFocus={displayBarHasFocus}>
        {children}
      </Title>
      <DisplayBar
        onClick={handleDropdown}
        $hasError={hasError}
        $dropdownIsOpen={dropdownIsOpen}
        onBlur={handleFocus}
        onFocus={handleFocus}
      >
        <span>{value || options[0]}</span>
      </DisplayBar>
      {dropdownIsOpen && (
        <ul>
          {options.length > 0 &&
            options.map((option, index) => {
              return (
                <Option key={index} onClick={handleInput} data-name={name}>
                  {option}
                </Option>
              );
            })}
        </ul>
      )}
      {isTouched && hasError && <p>{error}</p>}
    </Select>
  );
}

export default SelectInput;
