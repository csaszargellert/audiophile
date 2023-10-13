import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import HamburgerContextProvider from "./context/HamburgerContext";
import CartContextProvider from "./context/CartContext";

import AuthProvider from "./components/utils/auth";
import ProtectedRoute from "./context/ProtectedRoute";

import CurveBars from "./components/spinners/CurveBars";
import SpinnerContainer from "./components/utils/SpinnerContainer";

import GlobalStyles from "./globalStyles";

import App from "./App.jsx";
import Home, { loader as homeLoader } from "./pages/Home";
import CategoryPage, { loader as categoryLoader } from "./pages/CategoryPage";
import ProductPage, {
  loader as productLoader,
  action as deleteProductAction,
} from "./pages/ProductPage";
import AddProductPage, {
  action as addProductAction,
  loader as loadEnteredData,
} from "./pages/AddProductPage";
import EditProductPage, {
  loader as editProductLoader,
  action as editProductAction,
} from "./pages/EditProductPage";
import Login, { action as loginAction } from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import UnauthorizedPage from "./pages/Unauthorized";
import SuccessPage, { loader as successLoader } from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import { action as checkoutAction } from "./portals/CartPortal";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <App />,
    loader: () => {
      return {
        userIsAuthenticated: AuthProvider.isAuthenticated,
        userJwt: AuthProvider.jwt,
        userRoles: AuthProvider.roles,
        userId: AuthProvider.id,
        productsId: AuthProvider.productsId,
      };
    },
    errorElement: <ErrorPage />,
    children: [
      {
        path: "logout",
        action: async function () {
          try {
            await AuthProvider.signout();
            return redirect("/");
          } catch (error) {
            if (error.response.status === 401) {
              return redirect("/");
            }
          }
        },
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "success",
        element: <SuccessPage />,
        errorElement: <ErrorPage />,
        loader: successLoader,
      },
      {
        path: "cancel",
        element: <CancelPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "checkout",
        action: checkoutAction,
        errorElement: <ErrorPage />,
      },
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "categories/:slug",
        element: <CategoryPage />,
        loader: categoryLoader,
      },
      {
        path: "products",
        children: [
          {
            path: ":productId",
            element: <ProductPage />,
            loader: productLoader,
          },
          {
            element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
            children: [
              {
                path: "add",
                element: <AddProductPage />,
                action: addProductAction,
                loader: loadEnteredData,
              },
              {
                path: ":productId",
                children: [
                  {
                    path: "edit",
                    element: <EditProductPage />,
                    loader: editProductLoader,
                    action: editProductAction,
                  },
                  {
                    path: "delete",
                    action: deleteProductAction,
                    loader: ({ params }) => {
                      const { productId } = params;

                      return redirect("/products/" + productId);
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <HamburgerContextProvider>
        <GlobalStyles />
        <RouterProvider
          router={router}
          fallbackElement={
            <SpinnerContainer>
              <CurveBars />
            </SpinnerContainer>
          }
        />
      </HamburgerContextProvider>
    </CartContextProvider>
  </React.StrictMode>
);
