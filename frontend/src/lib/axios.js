import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-hub-api.vercel.app/api",
  withCredentials: true,
});
