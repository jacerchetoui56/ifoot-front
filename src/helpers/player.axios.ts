import axios from "axios";

export const playerAxios = axios.create({
  // baseURL: "https://softylearn.onrender.com/api/v1/",
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

playerAxios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("access_token");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (err) => err,
);

playerAxios.interceptors.response.use(
  (response) => response,
  async (err) => {
    const prevRequest = err?.config;
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth/player/login";
    } else if (err?.response?.status === 403 && !prevRequest?._retry) {
      prevRequest._retry = true;
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        const response = await playerAxios.post("/auth/player/refresh", {
          refresh_token,
        });
        prevRequest.headers["Authorization"] =
          `Bearer ${response.data.access_token}`;
        return playerAxios(prevRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/player/login";
      }
    }
    return Promise.reject(err);
  },
);
