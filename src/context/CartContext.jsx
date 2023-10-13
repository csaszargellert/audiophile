import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numItems, setNumItems] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = function () {
    setIsOpen((prev) => !prev);
  };

  const handleClose = function () {
    setIsOpen(false);
  };

  const addProduct = function (product) {
    const prodIndex = products.findIndex(
      (productEl) => productEl.id === product.id
    );

    if (prodIndex < 0) {
      setProducts((prevValue) => {
        return [...prevValue, product];
      });
      return;
    }

    const prod = products[prodIndex];

    const newProd = {
      ...prod,
      amount: prod.amount + product.amount,
    };

    const copyProduct = [...products];

    copyProduct[prodIndex] = newProd;

    setProducts(copyProduct);
  };

  const deleteProduct = function (id) {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== id);
    });
  };

  const editProduct = function (id, amount) {
    const prodIndex = products.findIndex((productEl) => productEl.id === id);

    const prod = products[prodIndex];

    const newProd = {
      ...prod,
      amount,
    };

    const copyProducts = [...products];

    copyProducts[prodIndex] = newProd;

    setProducts(copyProducts);
  };

  const removeAll = function () {
    setProducts([]);
  };

  useEffect(() => {
    const total = products.reduce((prevValue, product) => {
      return prevValue + product.amount * product.price;
    }, 0);
    setTotalPrice(total);
  }, [products]);

  useEffect(() => {
    setNumItems(products.length);
  }, [products]);

  const cartValue = {
    addProduct,
    removeAll,
    handleOpen,
    handleClose,
    editProduct,
    deleteProduct,
    numItems,
    totalPrice,
    isOpen,
    products,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;

export const useCart = function () {
  return useContext(CartContext);
};
