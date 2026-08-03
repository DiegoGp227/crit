import apiClient from "@/src/shared/services/apiClient";
import { LoginURL, SignupURL } from "@/src/shared/constants/urls";

export interface AuthDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    userInfo: {
        id: number;
        email: string;
        role: string;
        createdAt: string;
        updatedAt: string;
    };
}

export const signup = async (data: AuthDTO): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(SignupURL.href, data);
    return response.data;
};

export const login = async (data: AuthDTO): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(LoginURL.href, data);
    return response.data;
};
