import axios from "axios";

const Axios = axios.create({
  // baseURL: "https://softylearn.onrender.com/api/v1/",
  baseURL: "http://localhost:4000/api/",
  timeout: 10000,
});

Axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("accessToken");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (err) => err
);

Axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default Axios;
