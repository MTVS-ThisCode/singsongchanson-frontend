import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

export const postSongprompt = (formData) => {
  return axios
    .post(`${API_BASE_URL}/api/v1/musics`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const postImage = (formData) => {
  return axios
    .post(`${API_BASE_URL}/api/v1/musics/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getMymusic = (userNo) => {
  return axios
    .get(`${API_BASE_URL}/api/v1/musics/myMusic?userNo=${userNo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAllmusic = () => {
  return axios
    .get(`${API_BASE_URL}/api/v1/musics`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

export const postStreaming = (musicNo) => {
  return axios
    .put(
      `${API_BASE_URL}/api/v1/musics/count?musicNo=${musicNo}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    )
    .catch((error) => {
      return error.response;
    });
};

export const getRanking = () => {
  return axios
    .get(`${API_BASE_URL}/api/v1/musics/ranking`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};
