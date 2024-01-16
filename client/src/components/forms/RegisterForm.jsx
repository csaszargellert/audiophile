import styled from 'styled-components';
import { useActionData, Form } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useInput from '../../hooks/useInput';
import Input from '../inputs/Input';
import { ButtonOrange } from '../buttons/Button';
import { INITIAL_REGISTER_STATE, REDUCER, ACTION } from '../utils/constants';
import FormError from './FormError';
import { FormInput, InputEl } from '../inputs/Input';
import { ButtonGoBack } from '../buttons/Button';

export const MarginTopContainer = styled.div`
  margin-top: 0.8rem;
`;

export const ContainerRightAlign = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FormChangerButton = styled(ButtonGoBack)`
  font-size: 1.2rem;
  color: var(--orange);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin-bottom: 4rem;
`;

const FormEl = styled(Form)`
  --padding: 1.2rem;

  max-width: 40rem;
  width: 100%;
  padding: 4.8rem 3.2rem;

  background-color: var(--light-black);

  border-radius: var(--border-radius);

  h1 {
    color: var(--white);
    font-size: 3.2rem;
    font-weight: 700;
    letter-spacing: -0.0125rem;
    margin-bottom: 4rem;
  }
`;

const ButtonLogin = styled(ButtonOrange)`
  width: 100%;
`;

function RegisterForm() {
  const error = useActionData();
  const { state, handleInput, dispatch } = useInput(
    REDUCER,
    INITIAL_REGISTER_STATE
  );
  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    if (error) {
      setRegisterError(error);
    }
  }, [error]);

  useEffect(() => {
    if (
      state.confirmPassword.value === state.password.value &&
      state.confirmPassword.isTouched
    ) {
      dispatch({
        payload: ACTION.UPDATE_FORM,
        field: {
          name: 'confirmPassword',
          value: state.confirmPassword.value,
          hasError: false,
          error: '',
          isTouched: true,
          isFormValid: state.isFormValid,
        },
      });
    }
  }, [state.confirmPassword.value]);

  useEffect(() => {
    if (
      state.confirmPassword.value !== state.password.value &&
      state.confirmPassword.isTouched
    ) {
      dispatch({
        payload: ACTION.UPDATE_FORM,
        field: {
          name: 'confirmPassword',
          value: state.confirmPassword.value,
          hasError: true,
          error: 'Passwords do not match',
          isTouched: true,
          isFormValid: state.isFormValid,
        },
      });
    }

    if (
      state.confirmPassword.value === state.password.value &&
      state.confirmPassword.isTouched
    ) {
      dispatch({
        payload: ACTION.UPDATE_FORM,
        field: {
          name: 'confirmPassword',
          value: state.confirmPassword.value,
          hasError: false,
          error: '',
          isTouched: true,
          isFormValid: state.isFormValid,
        },
      });
    }
  }, [state.password.value]);

  const onChange = function (event) {
    const value = event.target.value;

    dispatch({
      payload: ACTION.UPDATE_FORM,
      field: {
        name: event.target.name,
        value: value,
        hasError: state.password.value !== value && value,
        error:
          state.password.value !== value && value
            ? 'Passwords do not match'
            : '',
        isTouched: true,
        isFormValid: state.isFormValid,
      },
    });
  };

  return (
    <FormEl method="POST">
      <h1>Register</h1>
      {registerError && <FormError>{registerError}</FormError>}
      <InputContainer>
        <Input
          type="text"
          id="username"
          name="username"
          handleInput={handleInput}
          inputState={state.username}
          bgIsDark={true}
        >
          Username
        </Input>
        <Input
          type="email"
          id="email"
          name="email"
          handleInput={handleInput}
          inputState={state.email}
          bgIsDark={true}
        >
          Email
        </Input>
        <Input
          type="password"
          id="password"
          name="password"
          handleInput={handleInput}
          inputState={state.password}
          bgIsDark={true}
        >
          Password
        </Input>

        <FormInput
          $hasError={state.confirmPassword?.hasError}
          $bgIsDark={true}
          $isTextArea={false}
        >
          <InputEl
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            $hasError={state.confirmPassword?.hasError}
            $bgIsDark={true}
            placeholder="Confirm Password"
            autoComplete="off"
            value={state.confirmPassword?.value}
            onChange={onChange}
            onFocus={onChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          {state.confirmPassword?.isTouched &&
            state.confirmPassword?.hasError && (
              <p>{state.confirmPassword?.error}</p>
            )}
        </FormInput>
      </InputContainer>
      <ButtonLogin asEl="button" disabledEl={!state.isFormValid}>
        register an account
      </ButtonLogin>
      <MarginTopContainer>
        <ContainerRightAlign>
          <FormChangerButton to="/login">
            Already have account?
          </FormChangerButton>
        </ContainerRightAlign>
      </MarginTopContainer>
    </FormEl>
  );
}

export default RegisterForm;
