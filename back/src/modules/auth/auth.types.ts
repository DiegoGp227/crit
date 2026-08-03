import { UserRole } from "@prisma/client";

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUser {
  email: string;
  password: string;
}
