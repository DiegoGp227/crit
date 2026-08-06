import apiClient from "@/src/shared/services/apiClient";
import type { AuthUser } from "@/src/store/authStore";
import { LoginURL, LogoutURL, SignupURL } from "@/src/shared/constants/urls";

export interface AuthDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    userInfo: AuthUser;
}

export const signup = async (data: AuthDTO): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(SignupURL, data);
    return response.data;
};

export const login = async (data: AuthDTO): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(LoginURL, data);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await apiClient.post(LogoutURL);
};
