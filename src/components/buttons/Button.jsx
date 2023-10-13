import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonDarkEl = styled(Link)`
  border: none;
  outline: none;
  background: none;

  display: inline-block;
  padding: 1.6rem 3.2rem;

  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  letter-spacing: 0.1rem;

  color: var(--black);
  background-color: transparent;
  border: 1px solid var(--black);

  cursor: pointer;

  transition: color var(--transition-duration) var(--transition-timing-function),
    background-color var(--transition-duration)
      var(--transition-timing-function);

  &:hover {
    color: var(--white);
    background-color: var(--black);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ButtonOrangeEl = styled(ButtonDarkEl)`
  color: var(--white);
  background-color: var(--orange);
  border: 1px solid var(--orange);

  &:hover {
    background-color: var(--light-orange);
    border: 1px solid var(--light-orange);
  }

  &:disabled {
    color: var(--white);
    background-color: var(--orange);
    border: 1px solid var(--orange);
  }
`;

const ButtonBlackEl = styled(ButtonDarkEl)`
  color: var(--white);
  background-color: var(--black);
  border: 1px solid #4c4c4c;

  &:hover {
    background-color: #4c4c4c;
    border: 1px solid #4c4c4c;
  }
`;

export const ButtonBlack = function ({
  children,
  asEl,
  to,
  className,
  onClick,
  replaceAtt,
  disabledEl,
}) {
  return (
    <ButtonBlackEl
      as={asEl}
      to={to}
      className={className}
      onClick={onClick}
      replace={replaceAtt}
      disabled={disabledEl}
    >
      {children}
    </ButtonBlackEl>
  );
};

export const ButtonWithBorder = function ({
  children,
  asEl,
  to,
  className,
  onClick,
  replaceAtt,
  disabledEl,
}) {
  return (
    <ButtonDarkEl
      as={asEl}
      to={to}
      className={className}
      onClick={onClick}
      replace={replaceAtt}
      disabled={disabledEl}
    >
      {children}
    </ButtonDarkEl>
  );
};

export const ButtonOrange = function ({
  children,
  asEl,
  to,
  className,
  onClick,
  replaceAtt,
}) {
  return (
    <ButtonOrangeEl
      as={asEl}
      to={to}
      className={className}
      onClick={onClick}
      replace={replaceAtt}
    >
      {children}
    </ButtonOrangeEl>
  );
};

const ButtonArrowEl = styled(Link)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.333rem;

    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.5);
      font-family: inherit;
      font-size: 1.3rem;
      font-weight: 700;
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      transition: color var(--transition-duration)
        var(--transition-timing-function);
    }
  }

  &:hover,
  &:active {
    span {
      color: var(--orange);
    }
  }
`;

export const ButtonArrow = function ({ to, className }) {
  return (
    <ButtonArrowEl className={className} to={to}>
      <span>shop</span>
      <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.322 1l5 5-5 5"
          stroke="#D87D4A"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </ButtonArrowEl>
  );
};

const GoBackEl = styled(Link)`
  &:link,
  &:visited {
    color: rgba(0, 0, 0, 0.5);
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.66;
    text-transform: capitalize;
    text-decoration: none;
    transition: color var(--transition-duration)
      var(--transition-timing-function);
  }

  &:hover,
  &:active {
    color: var(--light-orange);
  }
`;

export const ButtonGoBack = function ({ className }) {
  return (
    <GoBackEl to={-1} className={className}>
      go back
    </GoBackEl>
  );
};
