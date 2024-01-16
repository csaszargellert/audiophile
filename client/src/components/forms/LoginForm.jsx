import styled from 'styled-components';
import { useLocation, useActionData, Form } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useInput from '../../hooks/useInput';
import Input from '../inputs/Input';
import { ButtonOrange } from '../buttons/Button';
import { INITIAL_LOGIN_STATE, REDUCER } from '../utils/constants';
import FormError from './FormError';
import {
  MarginTopContainer,
  ContainerRightAlign,
  FormChangerButton,
} from './RegisterForm';

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

function LoginForm() {
  const error = useActionData();
  const { state, handleInput } = useInput(REDUCER, INITIAL_LOGIN_STATE);
  const [loginError, setLoginError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = location.state?.from?.pathname || params.get('from') || '/';
  useEffect(() => {
    if (error) {
      setLoginError(error);
    }
  }, [error]);

  return (
    <FormEl method="POST">
      <input type="hidden" name="redirectTo" value={from} />
      <h1>Login</h1>
      {loginError && <FormError>{loginError}</FormError>}
      <InputContainer>
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
      </InputContainer>
      <ButtonLogin asEl="button" disabledEl={!state.isFormValid}>
        Login to your account
      </ButtonLogin>
      <MarginTopContainer>
        <ContainerRightAlign>
          <FormChangerButton to="/register">
            Don't have account?
          </FormChangerButton>
        </ContainerRightAlign>
      </MarginTopContainer>
    </FormEl>
  );
}

export default LoginForm;
