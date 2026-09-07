import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { getClassification } from "./classification.services.js";

/**
 * @route GET /classification
 * @query { page?, pageSize? }
 * @returns { classification, pagination }
 */
export const getClassificationController = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 10));

    const all = await getClassification();
    const total = all.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const classification = all.slice(start, start + pageSize);

    res.status(200).json({ classification, pagination: { page, pageSize, total, totalPages } });
  },
);
