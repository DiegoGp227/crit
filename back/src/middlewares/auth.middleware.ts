import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { InternalServerError, UnauthorizedError } from "../errors/appError";
import { env } from "../config/env.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as { id: string; email: string };

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const unauthorized = new UnauthorizedError("Invalid or expired token");
      res.status(unauthorized.statusCode).json(unauthorized.toJSON());
      return;
    }

    if (error instanceof UnauthorizedError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    const internalError = new InternalServerError("Internal server error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};
