import styled from "styled-components";

import { ButtonBlack, ButtonWithBorder } from "../components/buttons/Button";
import PaddingContainer from "../components/utils/Container";
import { useLoaderData, json } from "react-router-dom";
import { axiosPrivate } from "../components/utils/axios";

const Container = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 4rem;
    margin-bottom: 4.8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4.8rem;
`;

function SuccessPage() {
  const data = useLoaderData();

  return (
    <PaddingContainer>
      <Container>
        <div>
          <p>We appreciate your purchase, {data?.customer?.name}!</p>
          <ButtonContainer>
            <ButtonBlack to={data?.invoice?.invoice_pdf}>
              download invoice
            </ButtonBlack>
            <ButtonWithBorder to="/">Go Home</ButtonWithBorder>
          </ButtonContainer>
        </div>
      </Container>
    </PaddingContainer>
  );
}

export default SuccessPage;

export const loader = async function ({ request }) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  try {
    const response = await axiosPrivate({
      url: "/success?session_id=" + sessionId,
      method: "GET",
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw json(
      { error: error.response.data.error },
      { status: error.response.status }
    );
  }
};
