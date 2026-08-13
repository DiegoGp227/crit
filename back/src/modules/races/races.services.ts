import { CompetitionType, RaceStatus } from "@prisma/client";
import ExcelJS from "exceljs";
import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/appError.js";
import { invalidateCached } from "../../lib/classificationCache.js";
import type { CreateRaceDTO, UpdateRaceDTO } from "./races.schemas.js";

const CLASSIFICATION_CACHE_KEY = "classification";

const COMPETITION_SHEETS: Array<{ type: CompetitionType; sheet: string }> = [
  { type: CompetitionType.EXPERTOS, sheet: "Expertos" },
  { type: CompetitionType.FEMENINO, sheet: "Femenino" },
];

const throwIfNotFound = (
  error: unknown,
): never => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2025"
  ) {
    throw new NotFoundError("Race");
  }
  throw error;
};

export const createRace = async (data: CreateRaceDTO) => {
  return prisma.raceDate.create({
    data: {
      raceDate: data.raceDate,
      status: RaceStatus.SCHEDULED,
    },
  });
};

export const listRaces = async ({
  status,
  page = 1,
  pageSize = 25,
}: {
  status?: RaceStatus;
  page?: number;
  pageSize?: number;
}) => {
  const where = { ...(status ? { status } : {}) };

  const [races, total] = await prisma.$transaction([
    prisma.raceDate.findMany({
      where,
      orderBy: { raceDate: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.raceDate.count({ where }),
  ]);

  return { races, total };
};

export const getRace = async (id: number) => {
  const race = await prisma.raceDate.findUnique({ where: { id } });

  if (!race) {
    throw new NotFoundError("Race");
  }

  return race;
};

export const updateRace = async (id: number, data: UpdateRaceDTO) => {
  try {
    return await prisma.raceDate.update({
      where: { id },
      data: {
        ...(data.raceDate !== undefined && { raceDate: data.raceDate }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });
  } catch (error) {
    throwIfNotFound(error);
  }
};

export const deleteRace = async (id: number) => {
  await getRace(id);

  await prisma.$transaction([
    prisma.result.deleteMany({ where: { raceDateId: id } }),
    prisma.raceDate.delete({ where: { id } }),
  ]);

  invalidateCached(CLASSIFICATION_CACHE_KEY);
};

export const generateRaceExcel = async (raceId: number): Promise<Buffer> => {
  await getRace(raceId);

  const registrations = await prisma.registration.findMany({
    orderBy: { profile: { registration: { bibNumber: "asc" } } },
    select: {
      profileId: true,
      competitionType: true,
      bibNumber: true,
      profile: {
        select: {
          fullName: true,
          team: true,
        },
      },
    },
  });

  const results = await prisma.result.findMany({
    where: { raceDateId: raceId },
    select: { profileId: true, status: true, points: true },
  });

  const resultByProfile = new Map(
    results.map((result) => [result.profileId, result]),
  );

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Crit";
  workbook.created = new Date();

  for (const { type, sheet } of COMPETITION_SHEETS) {
    const worksheet = workbook.addWorksheet(sheet, {
      views: [{ state: "frozen", ySplit: 1 }],
    });

    worksheet.columns = [
      { header: "profileId", key: "profileId", width: 12, hidden: true },
      { header: "Dorsal", key: "bib", width: 10 },
      { header: "Nombre", key: "name", width: 32 },
      { header: "Equipo", key: "team", width: 24 },
      { header: "Asistencia", key: "attendance", width: 14 },
      { header: "Puntos", key: "points", width: 10 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.height = 22;
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF181818" },
      };
      cell.alignment = { vertical: "middle" };
    });

    const riders = registrations.filter(
      (registration) => registration.competitionType === type,
    );

    riders.forEach((registration, index) => {
      const result = resultByProfile.get(registration.profileId);
      const row = worksheet.getRow(index + 2);

      row.getCell(1).value = registration.profileId;
      row.getCell(2).value = registration.bibNumber;
      row.getCell(3).value = registration.profile.fullName;
      row.getCell(4).value = registration.profile.team ?? "";
      row.getCell(5).value = result?.status ?? "";
      row.getCell(6).value = result?.points ?? "";
    });

    const lastRow = riders.length + 1;
    if (lastRow >= 2) {
      for (let rowNumber = 2; rowNumber <= lastRow; rowNumber += 1) {
        worksheet.getRow(rowNumber).getCell(5).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"PRESENT,ABSENT"'],
          showErrorMessage: true,
          errorTitle: "Valor inválido",
          error: "Selecciona PRESENT o ABSENT",
        };
      }
    }
  }

  return Buffer.from(await workbook.xlsx.writeBuffer());
};
