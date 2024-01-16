import styled from 'styled-components';
import { json, redirect } from 'react-router-dom';

import PaddingContainer from '../components/utils/Container';
import RegisterForm from '../components/forms/RegisterForm';
import AuthProvider from '../components/utils/auth';

const Section = styled.section`
  padding: 12rem 0;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Login() {
  return (
    <Section>
      <PaddingContainer>
        <FlexContainer>
          <RegisterForm />
        </FlexContainer>
      </PaddingContainer>
    </Section>
  );
}

export default Login;

export const action = async function ({ request }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  try {
    await AuthProvider.signup(username, email, password, confirmPassword);
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data.error;
    }

    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }

  return redirect('/login');
};
