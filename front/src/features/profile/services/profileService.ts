import apiClient from "@/src/shared/services/apiClient";
import {
  BibsURL,
  MeProfileURL,
  MeURL,
  RiderURL,
  UploadURL,
} from "@/src/shared/constants/urls";

export type CategoryType =
  | "PRINCIPIANTE"
  | "NOVATO"
  | "EXPERTO"
  | "RUTA"
  | "MUJER";

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  PRINCIPIANTE: "Principiante",
  NOVATO: "Novato",
  EXPERTO: "Experto",
  RUTA: "Ruta",
  MUJER: "Mujer",
};

export interface Profile {
  id: number;
  userId: number;
  fullName: string;
  avatarUrl: string | null;
  bibNumber: number;
  kilometers: number | null;
  category: CategoryType | null;
  team: string | null;
  bikePhotoUrl: string | null;
  bikeNickname: string | null;
  bikeFrame: string | null;
  bikeRatio: string | null;
  bikeWeight: number | null;
  bikeSize: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MyProfileResponse {
  user: {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  profile: Profile | null;
}

export interface ProfileStats {
  points: number;
  races: number;
}

export interface PublicProfileResponse {
  profile: Profile;
  stats: ProfileStats;
}

export interface UpdateProfileDTO {
  fullName: string;
  bibNumber?: number | null;
  avatarUrl?: string | null;
  kilometers?: number | null;
  category?: CategoryType | null;
  team?: string | null;
  bikePhotoUrl?: string | null;
  bikeNickname?: string | null;
  bikeFrame?: string | null;
  bikeRatio?: string | null;
  bikeWeight?: number | null;
  bikeSize?: string | null;
}

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const response = await apiClient.get<MyProfileResponse>(MeURL.href);
  return response.data;
};

export const getPublicProfile = async (
  id: number,
): Promise<PublicProfileResponse> => {
  const response = await apiClient.get<PublicProfileResponse>(RiderURL(id).href);
  return response.data;
};

export const getUsedBibs = async (): Promise<{ used: number[] }> => {
  const response = await apiClient.get<{ used: number[] }>(BibsURL.href);
  return response.data;
};

export const updateMyProfile = async (
  data: UpdateProfileDTO,
): Promise<Profile> => {
  const response = await apiClient.patch<{ message: string; profile: Profile }>(
    MeProfileURL.href,
    data,
  );
  return response.data.profile;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post<{ message: string; url: string }>(
    UploadURL.href,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data.url;
};
