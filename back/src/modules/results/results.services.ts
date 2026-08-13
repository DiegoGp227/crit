import ExcelJS from "exceljs";
import prisma from "../../db/prisma.js";
import { BadRequestError, NotFoundError } from "../../errors/appError.js";
import { invalidateCached } from "../../lib/classificationCache.js";
import type { RaceResultDTO } from "./results.schemas.js";

const CLASSIFICATION_CACHE_KEY = "classification";

const replaceRaceResults = async (raceId: number, results: RaceResultDTO[]) => {
  const race = await prisma.raceDate.findUnique({ where: { id: raceId } });

  if (!race) {
    throw new NotFoundError("Race");
  }

  await prisma.$transaction([
    prisma.result.deleteMany({ where: { raceDateId: raceId } }),
    prisma.result.createMany({
      data: results.map((result) => ({
        profileId: result.profileId,
        raceDateId: raceId,
        status: result.status,
        points: result.points,
      })),
    }),
  ]);

  invalidateCached(CLASSIFICATION_CACHE_KEY);
};

export const setRaceResults = async (raceId: number, results: RaceResultDTO[]) => {
  const profileIds = results.map((result) => result.profileId);

  if (new Set(profileIds).size !== profileIds.length) {
    throw new BadRequestError("Corredor duplicado en los resultados");
  }

  if (profileIds.length > 0) {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: profileIds } },
      select: { id: true },
    });

    const foundIds = new Set(profiles.map((profile) => profile.id));
    const missingIds = profileIds.filter((id) => !foundIds.has(id));

    if (missingIds.length > 0) {
      throw new BadRequestError(
        `Corredor inexistente: ${missingIds.join(", ")}`,
      );
    }
  }

  await replaceRaceResults(raceId, results);
};

interface ParsedRaceExcelRow {
  sheet: string;
  rowNumber: number;
  profileId: number | null;
  attendance: unknown;
  points: unknown;
}

interface RaceExcelError {
  fila: string;
  motivo: string;
}

const parseRaceExcel = async (buffer: Buffer): Promise<ParsedRaceExcelRow[]> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as any);

  const rows: ParsedRaceExcelRow[] = [];

  workbook.eachSheet((worksheet) => {
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return;

      const profileIdCell = row.getCell(1).value;

      rows.push({
        sheet: worksheet.name,
        rowNumber,
        profileId:
          typeof profileIdCell === "number" ? profileIdCell : null,
        attendance: row.getCell(5).value,
        points: row.getCell(6).value,
      });
    });
  });

  return rows;
};

const isEmptyValue = (value: unknown): boolean =>
  value === null || value === undefined || value === "";

const parseIntegerValue = (value: unknown): number | null => {
  if (isEmptyValue(value)) return null;

  const parsed =
    typeof value === "number" ? value : Number(String(value).trim());

  return Number.isInteger(parsed) ? parsed : null;
};

export const uploadRaceResults = async (
  raceId: number,
  buffer: Buffer,
): Promise<number> => {
  const race = await prisma.raceDate.findUnique({ where: { id: raceId } });

  if (!race) {
    throw new NotFoundError("Race");
  }

  const rows = await parseRaceExcel(buffer);

  const registrations = await prisma.registration.findMany({
    select: {
      profileId: true,
      bibNumber: true,
      profile: { select: { fullName: true } },
    },
  });

  const expected = new Map(
    registrations.map((registration) => [
      registration.profileId,
      {
        fullName: registration.profile.fullName,
        bibNumber: registration.bibNumber,
      },
    ]),
  );

  const fileProfileIds = rows
    .map((row) => row.profileId)
    .filter((id): id is number => id !== null);

  const existingProfiles = await prisma.profile.findMany({
    where: { id: { in: fileProfileIds } },
    select: { id: true },
  });
  const existingProfileIds = new Set(existingProfiles.map((profile) => profile.id));

  const errors: RaceExcelError[] = [];
  const seen = new Set<number>();
  const presentIds = new Set<number>();
  const results: RaceResultDTO[] = [];

  for (const row of rows) {
    const label = `${row.sheet} · fila ${row.rowNumber}`;

    if (row.profileId === null || row.profileId <= 0) {
      errors.push({
        fila: label,
        motivo: "profileId inexistente o inválido",
      });
      continue;
    }

    if (!expected.has(row.profileId)) {
      errors.push({
        fila: label,
        motivo: existingProfileIds.has(row.profileId)
          ? "Filas adicionales: corredor no inscrito en el campeonato"
          : "Corredor inexistente",
      });
      continue;
    }

    if (seen.has(row.profileId)) {
      errors.push({ fila: label, motivo: "Corredor duplicado" });
      continue;
    }
    seen.add(row.profileId);
    presentIds.add(row.profileId);

    const attendance = row.attendance;
    if (isEmptyValue(attendance)) {
      errors.push({ fila: label, motivo: "Asistencia vacía" });
    } else if (
      typeof attendance !== "string" ||
      !["PRESENT", "ABSENT"].includes(attendance.trim().toUpperCase())
    ) {
      errors.push({
        fila: label,
        motivo: "Formato inválido: Asistencia debe ser PRESENT o ABSENT",
      });
    }

    const points = parseIntegerValue(row.points);
    if (isEmptyValue(row.points)) {
      errors.push({ fila: label, motivo: "Puntos vacíos" });
    } else if (points === null) {
      errors.push({
        fila: label,
        motivo: "Formato inválido: Puntos debe ser un número entero",
      });
    }

    if (
      typeof attendance === "string" &&
      ["PRESENT", "ABSENT"].includes(attendance.trim().toUpperCase()) &&
      points !== null
    ) {
      results.push({
        profileId: row.profileId,
        status: attendance.trim().toUpperCase() as RaceResultDTO["status"],
        points,
      });
    }
  }

  for (const [profileId, profile] of expected) {
    if (!presentIds.has(profileId)) {
      errors.push({
        fila: "Plantilla",
        motivo: `Filas eliminadas: falta ${profile.fullName} (dorsal ${profile.bibNumber})`,
      });
    }
  }

  if (errors.length > 0) {
    throw new BadRequestError(
      "El archivo Excel contiene errores de validación. No se guardó nada.",
      { errors },
    );
  }

  await replaceRaceResults(raceId, results);

  return results.length;
};

export const listRaceResults = async (raceId: number) => {
  const race = await prisma.raceDate.findUnique({ where: { id: raceId } });

  if (!race) {
    throw new NotFoundError("Race");
  }

  return prisma.result.findMany({
    where: { raceDateId: raceId },
    orderBy: { profile: { registration: { bibNumber: "asc" } } },
    select: {
      id: true,
      profileId: true,
      raceDateId: true,
      status: true,
      points: true,
      createdAt: true,
      profile: {
        select: {
          fullName: true,
          team: true,
          registration: {
            select: { bibNumber: true },
          },
        },
      },
    },
  });
};
