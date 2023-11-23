import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

export const postComment = (data) => {
  return axios
    .post(`${API_BASE_URL}/api/v1/comments`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

export const getComment = (roomId) => {
  return axios
    .get(`${API_BASE_URL}/api/v1/comments/room?roomId=${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteComment = (commentNo) => {
  return axios
    .delete(`${API_BASE_URL}/api/v1/comments/${commentNo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};
