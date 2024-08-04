import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://url-shortener-i6s8.onrender.com",
});

export default axiosInstance;
