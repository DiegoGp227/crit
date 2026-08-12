import { Request, Response } from "express";
import { ValidationError } from "../../errors/appError.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import {
  createRace,
  deleteRace,
  generateRaceExcel,
  getRace,
  listRaces,
  updateRace,
} from "./races.services.js";
import {
  createRaceSchema,
  listRacesQuerySchema,
  raceIdParamSchema,
  updateRaceSchema,
} from "./races.schemas.js";

const parseErrors = (issues: Array<{ path: PropertyKey[]; message: string }>) =>
  issues.reduce<Record<string, string>>((acc, err) => {
    acc[err.path.join(".")] = err.message;
    return acc;
  }, {});

/**
 * @route POST /admin/races
 * @body { raceDate }
 * @returns { message, race }
 */
export const createRaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = createRaceSchema.safeParse(req.body);

    if (!validation.success) {
      throw new ValidationError("Validation errors", parseErrors(validation.error.issues));
    }

    const race = await createRace(validation.data);

    res.status(201).json({ message: "Race created", race });
  },
);

/**
 * @route GET /races | /admin/races
 * @query { status?, page?, pageSize? }
 * @returns { races, pagination }
 */
export const listRacesController = asyncHandler(
  async (req: Request, res: Response) => {
    const query = listRacesQuerySchema.safeParse(req.query);

    if (!query.success) {
      throw new ValidationError("Validation errors", parseErrors(query.error.issues));
    }

    const { status, page, pageSize } = query.data;

    const { races, total } = await listRaces({ status, page, pageSize });

    res.status(200).json({
      races,
      pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    });
  },
);

/**
 * @route GET /races/:id | /admin/races/:id
 * @returns { race }
 */
export const getRaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = raceIdParamSchema.safeParse(req.params);

    if (!params.success) {
      throw new ValidationError("Validation errors", parseErrors(params.error.issues));
    }

    const race = await getRace(params.data.id);

    res.status(200).json({ race });
  },
);

/**
 * @route PATCH /admin/races/:id
 * @body { raceDate?, status? }
 * @returns { message, race }
 */
export const updateRaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = raceIdParamSchema.safeParse(req.params);
    const body = updateRaceSchema.safeParse(req.body);

    if (!params.success || !body.success) {
      const issues = [
        ...(params.success ? [] : params.error.issues),
        ...(body.success ? [] : body.error.issues),
      ];
      throw new ValidationError("Validation errors", parseErrors(issues));
    }

    const race = await updateRace(params.data.id, body.data);

    res.status(200).json({ message: "Race updated", race });
  },
);

/**
 * @route DELETE /admin/races/:id
 * @returns { message }
 */
export const deleteRaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = raceIdParamSchema.safeParse(req.params);

    if (!params.success) {
      throw new ValidationError("Validation errors", parseErrors(params.error.issues));
    }

    await deleteRace(params.data.id);

    res.status(200).json({ message: "Race deleted" });
  },
);

/**
 * @route GET /admin/races/:id/excel
 * @returns { xlsx file }
 */
export const downloadRaceExcelController = asyncHandler(
  async (req: Request, res: Response) => {
    const params = raceIdParamSchema.safeParse(req.params);

    if (!params.success) {
      throw new ValidationError("Validation errors", parseErrors(params.error.issues));
    }

    const buffer = await generateRaceExcel(params.data.id);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="carrera-${params.data.id}.xlsx"`,
    );
    res.setHeader("Content-Length", String(buffer.length));
    res.send(buffer);
  },
);
