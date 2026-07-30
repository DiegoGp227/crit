
import apiClient from "@/src/shared/services/apiClient";
import { AxiosError } from "axios";

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    // Mismo comportamiento que el resto de fetchers: relanzamos el AxiosError
    // para que el consumidor pueda leer error.response.data de forma consistente
    const axiosError = error as AxiosError;
    console.error(`Error in fetcher for ${url}:`, axiosError);
    throw axiosError;
  }
};

export const postFetcher = async <T>(
  url: string,
  params: Record<string, any>,
  contentType?: string
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, params, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(`Error in postFetcher for ${url}:`, axiosError);

    throw axiosError;
  }
};

export const deleteFetcher = async (
  url: string, 
  contentType?: string 
) => {
  try {
    const response = await apiClient.delete(url, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(`Error in deleteFetcher for ${url}:`, axiosError);

    throw axiosError;
  }
};

export const putFetcher = async <T>(
  url: string,
  params: Record<string, any>,
  contentType?: string
): Promise<T> => {
  try {
    const response = await apiClient.put<T>(url, params, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(`Error in putFetcher for ${url}:`, axiosError);

    throw axiosError;
  }
};

// Función específica para upload de archivos con FormData
export const uploadFileFetcher = async <T>(
  url: string,
  formData: FormData
): Promise<T> => {
  try {
    // No establecer Content-Type para que axios lo maneje automáticamente con el boundary
    const response = await apiClient.post<T>(url, formData, {
      headers: {
        "Content-Type": undefined as any,
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(`Error in uploadFileFetcher for ${url}:`, axiosError);

    throw axiosError;
  }
};

export const patchFetcher = async <T>(
  url: string,
  params: Record<string, any> | FormData,
  contentType?: string
): Promise<T> => {
  try {
    const response = await apiClient.patch<T>(url, params, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(`Error in patchFetcher for ${url}:`, axiosError);

    throw axiosError;
  }
};
