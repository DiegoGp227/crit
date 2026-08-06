import axios, { AxiosError } from "axios";
import { BaseURL } from "../constants/urls";
import { logger } from "../utils/logger";

const apiClient = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event("app:unauthorized"));
    }
    logger.error("API Error", error);
    return Promise.reject(error);
  }
);

export default apiClient;
