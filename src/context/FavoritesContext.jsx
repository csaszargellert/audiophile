import { useContext, createContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

function FavoriteContextProvider({ children }) {
  const [initialRender, setInitialRender] = useState(true);
  const [removedFavId, setRemovedFavId] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const addFavorite = function (productId) {
    setFavorites((prev) => [...prev, productId]);
  };

  const removeFavorite = function (productId) {
    setFavorites((prev) => prev.filter((favorite) => favorite !== productId));
    setRemovedFavId(productId);
  };

  const clearFavorites = function () {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const checkIsFavorite = function (id) {
    return favorites.includes(id);
  };

  useEffect(() => {
    if (!initialRender) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      setInitialRender(false);
    }
  }, [favorites]);

  const favoriteValue = {
    removeFavorite,
    addFavorite,
    clearFavorites,
    checkIsFavorite,
    removedFavId,
    favNum: favorites.length,
  };

  return (
    <FavoriteContext.Provider value={favoriteValue}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContextProvider;

export const useFavorites = function () {
  return useContext(FavoriteContext);
};
