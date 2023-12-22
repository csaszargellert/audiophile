import { useContext, createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ToastContext = createContext();

function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = function (id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = function (toast) {
    setToasts((prev) => {
      return [
        ...prev,
        {
          ...toast,
          id: uuidv4(),
        },
      ];
    });
  };

  useEffect(() => {
    let timer;
    if (toasts.length) {
      timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [toasts.length]);

  const toastValue = {
    addToast,
    removeToast,
    toasts,
  };

  return (
    <ToastContext.Provider value={toastValue}>{children}</ToastContext.Provider>
  );
}

export default ToastContextProvider;

export const useToast = function () {
  return useContext(ToastContext);
};
