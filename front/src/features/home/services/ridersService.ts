import apiClient from "@/src/shared/services/apiClient";
import { RidersURL } from "@/src/shared/constants/urls";
import type { CategoryType } from "@/src/features/profile/services/profileService";

export interface Rider {
  id: number;
  fullName: string;
  avatarUrl: string | null;
  team: string | null;
  category: CategoryType | null;
}

export const fetchRiders = async (): Promise<Rider[]> => {
  const response = await apiClient.get<{ riders: Rider[] }>(RidersURL);
  return response.data.riders;
};
