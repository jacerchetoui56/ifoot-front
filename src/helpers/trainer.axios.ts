import axios from "axios";

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
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth/trainer/login";
    } else if (err?.response?.status === 403) {
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        const response = await trainerAxios.post("/auth/trainer/refresh", {
          refresh_token,
        });
        trainerAxios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
        return trainerAxios(err.config);
      } catch (err) {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/trainer/login";
      }
    }
    return Promise.reject(err);
  },
);
