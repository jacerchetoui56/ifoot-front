import axios from "axios";
import { Axios } from "./axios";

export const trainerAxios = axios.create({
  // baseURL: "https://softylearn.onrender.com/api/v1/",
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

trainerAxios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("access_token");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (err) => err,
);

trainerAxios.interceptors.response.use(
  (response) => response,
  async (err) => {
    const prevRequest = err?.config;
    if (err?.response?.status === 401 && !prevRequest?._retry) {
      prevRequest._retry = true;
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        const response = await Axios.post("/auth/refresh", {
          refresh_token,
        });
        prevRequest.headers["Authorization"] =
          `Bearer ${response.data.access_token}`;
        return trainerAxios(prevRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/auth/trainer/login";
      }
    }
    return Promise.reject(err);
  },
);
