import styled from "styled-components";
import { json, redirect } from "react-router-dom";

import PaddingContainer from "../components/utils/Container";
import LoginForm from "../components/forms/LoginForm";
import AuthProvider from "../components/utils/auth";

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
          <LoginForm />
        </FlexContainer>
      </PaddingContainer>
    </Section>
  );
}

export default Login;

export const action = async function ({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await AuthProvider.signin(email, password);
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

  const from = formData.get("redirectTo") || "/";
  return redirect(from);
};
