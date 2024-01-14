import { axiosBase } from "./axios";

export default async function refreshToken() {
  const response = await axiosBase({
    url: "/refresh-token",
    method: "GET",
  });
  return response.data.jwt;
}
