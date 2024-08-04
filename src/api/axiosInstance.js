import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://url-shortener-backend-emxd.onrender.com",
});

export default axiosInstance;
