import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

export const postRoomInfo = (data) => {
  return axios
    .post(`${API_BASE_URL}/api/v1/rooms`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        //"ngrok-skip-browser-warning": "1",
      },
    })
    .catch((error) => {
      return error.response;
    });
};

export const getRoomList = () => {
  return axios
    .get(`${API_BASE_URL}/api/v1/rooms`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        //"ngrok-skip-browser-warning": "1",
      },
    })
    .catch((error) => {
      return error.response;
    });
};

export const getRoomInfo = (roomId) => {
  return axios
    .get(`${API_BASE_URL}/api/v1/rooms/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        //"ngrok-skip-browser-warning": "1",
      },
    })
    .catch((error) => {
      return error.response;
    });
};
