import { Request, Response } from "express";
import { BadRequestError, ValidationError } from "../../errors/appError.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import {
  listRaceResults,
  setRaceResults,
  uploadRaceResults,
} from "./results.services.js";
import {
  raceIdParamSchema,
  setResultsBodySchema,
} from "./results.schemas.js";

const parseErrors = (issues: Array<{ path: PropertyKey[]; message: string }>) =>
  issues.reduce<Record<string, string>>((acc, err) => {
    acc[err.path.join(".")] = err.message;
    return acc;
  }, {});

/**
 * @route GET /races/:id/results | /admin/races/:id/results
 * @returns { results }
 */
export const getRaceResultsController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = raceIdParamSchema.safeParse(req.params);

    if (!params.success) {
      throw new ValidationError("Validation errors", parseErrors(params.error.issues));
    }

    const results = await listRaceResults(params.data.id);

    res.status(200).json({ results });
  },
);

/**
 * @route PUT /admin/races/:id/results
 * @body { results: [{ profileId, status, points }] }
 * @returns { message }
 */
export const setRaceResultsController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = raceIdParamSchema.safeParse(req.params);
    const body = setResultsBodySchema.safeParse(req.body);

    if (!params.success || !body.success) {
      const issues = [
        ...(params.success ? [] : params.error.issues),
        ...(body.success ? [] : body.error.issues),
      ];
      throw new ValidationError("Validation errors", parseErrors(issues));
    }

    await setRaceResults(params.data.id, body.data.results);

    res.status(200).json({ message: "Results saved" });
  },
);

/**
 * @route POST /admin/races/:id/excel
 * @body multipart/form-data { file }
 * @returns { message, count }
 */
export const uploadRaceExcelController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = raceIdParamSchema.safeParse(req.params);

    if (!params.success) {
      throw new ValidationError("Validation errors", parseErrors(params.error.issues));
    }

    if (!req.file) {
      throw new BadRequestError("No se recibió ningún archivo");
    }

    const count = await uploadRaceResults(params.data.id, req.file.buffer);

    res.status(200).json({ message: "Results saved", count });
  },
);
