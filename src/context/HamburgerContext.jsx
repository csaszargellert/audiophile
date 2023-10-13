import { useContext, createContext, useState } from "react";

export const HamburgerContext = createContext();

function HamburgerContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = function () {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClose = function () {
    setIsOpen(false);
  };

  const hamburgerValue = {
    isOpen,
    handleOpen,
    handleClose,
  };

  return (
    <HamburgerContext.Provider value={hamburgerValue}>
      {children}
    </HamburgerContext.Provider>
  );
}

export default HamburgerContextProvider;

export const useHamburger = function () {
  return useContext(HamburgerContext);
};
