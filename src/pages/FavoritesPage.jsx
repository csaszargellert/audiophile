import { useLoaderData, json } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { axiosBase } from "../components/utils/axios";
import PaddingContainer from "../components/utils/Container";
import Favorites from "../components/favorites/Favorites";
import PageTitle from "../components/PageTitle";
import Negate from "../components/Negate";
import { useFavorites } from "../context/FavoritesContext";

const Section = styled.section`
  padding: 0 0 9rem 0;

  @media (min-width: 56.25em) {
    padding: 0 0 12rem 0;
  }
`;

function FavoritesPage() {
  const data = useLoaderData();
  const [favorites, setFavorites] = useState(data);
  const { removedFavId } = useFavorites();
  useEffect(() => {
    if (removedFavId) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== removedFavId));
    }
  }, [removedFavId]);

  return (
    <>
      <PageTitle>favorites</PageTitle>
      <PaddingContainer>
        <Section>
          {favorites.length > 0 ? (
            <Favorites favorites={favorites} />
          ) : (
            <Negate>
              no <span>favorite</span> product yet
            </Negate>
          )}
        </Section>
      </PaddingContainer>
    </>
  );
}

export default FavoritesPage;

export const loader = async function () {
  const favorites = localStorage.getItem("favorites");

  const searchParams = new URLSearchParams();
  searchParams.set("favorites", favorites);

  try {
    const response = await axiosBase({
      url: "/products?" + searchParams.toString(),
      method: "GET",
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
