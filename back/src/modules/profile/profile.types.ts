import { CategoryType, UserRole } from "@prisma/client";

export interface ProfileResponse {
  id: number;
  userId: number;
  fullName: string;
  avatarUrl: string | null;
  kilometers: number | null;
  category: CategoryType | null;
  team: string | null;
  bikePhotoUrl: string | null;
  bikeNickname: string | null;
  bikeFrame: string | null;
  bikeRatio: string | null;
  bikeWeight: number | null;
  bikeSize: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MyProfileResponse {
  user: {
    id: number;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  };
  profile: ProfileResponse | null;
}

export interface PublicProfileResponse {
  profile: ProfileResponse;
  stats: {
    points: number;
    races: number;
    victories: number;
    km: number;
  };
}
