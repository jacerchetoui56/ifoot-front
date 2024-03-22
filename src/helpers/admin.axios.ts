import axios from "axios";

export const adminAxios = axios.create({
  // baseURL: "https://softylearn.onrender.com/api/v1/",
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

adminAxios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("access_token");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (err) => err,
);

adminAxios.interceptors.response.use(
  (response) => response,
  async (err) => {
    const prevRequest = err?.config;
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth/admin/login";
    } else if (err?.response?.status === 403 && !prevRequest?._retry) {
      prevRequest._retry = true;
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        const response = await adminAxios.post("/auth/admin/refresh", {
          refresh_token,
        });
        prevRequest.headers["Authorization"] =
          `Bearer ${response.data.access_token}`;
        return adminAxios(prevRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/admin/login";
      }
    }
    return Promise.reject(err);
  },
);
