import axios from "axios";
import { API_BASE_URL } from "../constants";

export const getCurrentUser = (accessToken) => {
  return axios
    .get(`${API_BASE_URL}/api/v1/users/info`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "1",
      },
    })
    .catch((error) => {
      return error.response;
    });
};

export const postAvatar = (accessToken, formData) => {
  return axios
    .post(`${API_BASE_URL}/api/v1/s3/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "1",
      },
    })
    .catch((error) => {
      return error.response;
    });
};
