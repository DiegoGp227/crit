import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { EmailAlreadyInUseError, InvalidCredentialsError } from "../../errors/appError.js";
import { UserRole } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { IAuthUser, ICreateUser, IUserResponse } from "./auth.types";
import { env } from "../../config/env.js";

export const createUser = async (
  userData: ICreateUser,
): Promise<{ user: IUserResponse; token: string }> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new EmailAlreadyInUseError(userData.email);
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  let user;
  try {
    user = await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new EmailAlreadyInUseError(userData.email);
    }
    throw error;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.TOKEN_EXPIRATION as SignOptions["expiresIn"],
  });

  return { user, token };
};

export const validateUser = async (
  userData: IAuthUser,
): Promise<{ user: IUserResponse; token: string }> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (!existingUser) {
    throw new InvalidCredentialsError();
  }

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    existingUser.passwordHash,
  );

  if (!isPasswordValid) {
    throw new InvalidCredentialsError();
  }

  const user = {
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
    createdAt: existingUser.createdAt,
    updatedAt: existingUser.updatedAt,
  };

  const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.TOKEN_EXPIRATION as SignOptions["expiresIn"],
  });

  return { user, token };
};

export const createAdminUser = async (
  userData: ICreateUser,
): Promise<IUserResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new EmailAlreadyInUseError(userData.email);
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  let user;
  try {
    user = await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash,
        role: UserRole.ADMIN,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new EmailAlreadyInUseError(userData.email);
    }
    throw error;
  }

  return user;
};
