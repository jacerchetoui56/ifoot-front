import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

Axios.interceptors.response.use(
  (response) => response,
  async (err) => {
    console.log("Axios interceptor error");
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
        localStorage.setItem("access_token", response.data.access_token);
        return Axios(prevRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        console.log(err);
        // window.location.href = "/";
      }
    }
    return Promise.reject(err);
  },
);
