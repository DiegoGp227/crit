import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { getClassification } from "./classification.services.js";

/**
 * @route GET /classification
 * @returns { classification }
 */
export const getClassificationController = asyncHandler(
  async (_req: Request, res: Response) => {
    const classification = await getClassification();
    res.status(200).json({ classification });
  },
);
