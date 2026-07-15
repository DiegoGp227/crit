import axios, { AxiosError } from "axios";
import { BaseURL } from "../constants/urls";
import { logger } from "../utils/logger";

const apiClient = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar tokens de autenticación
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globalmente.
// Si el servidor responde 401, el token expiró o es inválido:
// limpiamos la sesión y redirigimos al login automáticamente.
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
