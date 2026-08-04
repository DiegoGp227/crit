import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";
import { ForbiddenError, UnauthorizedError } from "../errors/appError.js";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new UnauthorizedError("No token provided");
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      throw new ForbiddenError("Admin access required");
    }

    next();
  } catch (error) {
    next(error);
  }
};
