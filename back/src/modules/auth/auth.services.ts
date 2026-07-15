// RM: Services Example — replace with your own services
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { EmailAlreadyInUseError, InvalidCredentialsError } from "../../errors/appError.js";
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

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: passwordHash,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

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
    throw new InvalidCredentialsError(userData.email);
  }

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    existingUser.password,
  );

  if (!isPasswordValid) {
    throw new InvalidCredentialsError(userData.email);
  }

  const user = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    createdAt: existingUser.createdAt,
    updatedAt: existingUser.updatedAt,
  };

  const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.TOKEN_EXPIRATION as SignOptions["expiresIn"],
  });

  return { user, token };
};
