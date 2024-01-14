import axios from "axios";
import AuthProvider from "./auth";
import refreshToken from "./refreshToken";

const baseURL = import.meta.env.VITE_SERVER_URL;

const axiosBase = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  function (config) {
    if (!config.headers.hasAuthorization() && AuthProvider.jwt) {
      config.headers.setAuthorization(`Bearer ${AuthProvider.jwt}`);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const prevConfig = error.config;
    if (error.response.status === 403 && !prevConfig._retry) {
      prevConfig._retry = true;
      let newAccessToken = await refreshToken();
      AuthProvider.setJwt(newAccessToken);
      prevConfig.headers.setAuthorization(`Bearer ${newAccessToken}`);
      prevConfig.headers["Content-Type"] = "application/json";
      return axiosBase(prevConfig);
    }

    return Promise.reject(error);
  }
);

export { axiosBase, axiosPrivate };
