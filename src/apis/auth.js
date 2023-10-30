import axios from "axios";
import { API_BASE_URL } from "../constants";

export const getCurrentUser = (accessToken) => {
  return axios
    .get(`${API_BASE_URL}/api/v1/user/info`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};
