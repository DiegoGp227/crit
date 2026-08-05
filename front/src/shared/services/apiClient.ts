import axios, { AxiosError } from "axios";
import { BaseURL } from "../constants/urls";
import { logger } from "../utils/logger";

const apiClient = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: el navegador adjunta la cookie de sesión (HttpOnly)
  // automáticamente en cada request. El token ya NO se lee de localStorage.
  // Requiere que el backend tenga CORS con `credentials: true` (ya lo tiene).
  withCredentials: true,
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
