// RM: Health-check example — remove/replace in production
import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { logger } from "../../utils/logger";

const dbCheck = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1 AS ok`;
    res.status(200).json({
      status: "success",
      message: "Connected to PostgreSQL successfully"
    });
  } catch (error) {
    logger.error("Error connecting to PostgreSQL", error);
    res.status(500).json({
      status: "error",
      message: "Could not connect to the database"
    });
  }
};

export default dbCheck;
