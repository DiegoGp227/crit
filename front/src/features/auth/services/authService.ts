import apiClient from "@/src/shared/services/apiClient";
import type { AuthUser } from "@/src/store/authStore";
import { LoginURL, LogoutURL, SignupURL } from "@/src/shared/constants/urls";

export interface AuthDTO {
    email: string;
    password: string;
}

// El backend ya NO devuelve `token` en el body: la sesión viaja en una
// cookie HttpOnly que el navegador adjunta sola en cada request.
export interface AuthResponse {
    message: string;
    userInfo: AuthUser;
}

export const signup = async (data: AuthDTO): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(SignupURL.href, data);
    return response.data;
};

export const login = async (data: AuthDTO): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(LoginURL.href, data);
    return response.data;
};

// Cierra la sesión en el backend: borra la cookie HttpOnly server-side
// (el frontend no puede borrarla solo, porque es invisible a JavaScript).
export const logout = async (): Promise<void> => {
    await apiClient.post(LogoutURL.href);
};
