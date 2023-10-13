import { json, useLoaderData } from "react-router-dom";

import { axiosBase } from "../components/utils/axios";
import Hero from "../components/hero/Hero";
import Categories from "../components/categories/Categories";
import PaddingContainer from "../components/utils/Container";
import ZPattern from "../components/z-pattern/ZPattern";

function Home() {
  const data = useLoaderData();

  return (
    <>
      <Hero />
      <PaddingContainer>
        <Categories />
        <ZPattern data={data} />
      </PaddingContainer>
    </>
  );
}

export default Home;

export const loader = async function () {
  try {
    const response = await axiosBase({
      method: "GET",
      url: "/products",
    });

    return response.data.data;
  } catch (error) {
    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }
};
