import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { InternalServerError, UnauthorizedError } from "../errors/appError";
import { env } from "../config/env.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // 1) Prioridad: cookie HttpOnly (autenticación web).
    // 2) Fallback: header "Authorization: Bearer" (clientes externos o curl).
    const token =
      req.cookies?.[env.COOKIE_NAME] ??
      (() => {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) return undefined;
        return authHeader.split(" ")[1];
      })();

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as { id: number; email: string };

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
