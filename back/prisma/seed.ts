import bcrypt from "bcryptjs";
import { PrismaClient, CompetitionType, CategoryType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const ADMIN_EMAIL = "admin@crit.com";
const PASSWORD = "Test1234#";

interface SeedRider {
  email: string;
  fullName: string;
  competitionType: CompetitionType;
  category: CategoryType;
  bibNumber: number;
  document: string;
  phone: string;
  eps: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  team?: string;
  kilometers?: number;
}

const RIDERS: SeedRider[] = [
  {
    email: "corredor01@crit.com",
    fullName: "Andrés Felipe Rojas",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 101,
    document: "1000000001",
    phone: "3001000001",
    eps: "Salud Total",
    emergencyContactName: "María Rojas",
    emergencyContactPhone: "3111000001",
    team: "Team Bogotá",
    kilometers: 1520,
  },
  {
    email: "corredor02@crit.com",
    fullName: "Carlos Eduardo Méndez",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 102,
    document: "1000000002",
    phone: "3001000002",
    eps: "Sanitas",
    emergencyContactName: "Lucía Méndez",
    emergencyContactPhone: "3111000002",
    team: "Team Bogotá",
    kilometers: 1390,
  },
  {
    email: "corredor03@crit.com",
    fullName: "Jorge Iván Castillo",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 103,
    document: "1000000003",
    phone: "3001000003",
    eps: "Nueva EPS",
    emergencyContactName: "Diana Castillo",
    emergencyContactPhone: "3111000003",
    team: "Ciclo Ruta Norte",
    kilometers: 1280,
  },
  {
    email: "corredor04@crit.com",
    fullName: "Miguel Ángel Prieto",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 104,
    document: "1000000004",
    phone: "3001000004",
    eps: "Compensar",
    emergencyContactName: "Sofía Prieto",
    emergencyContactPhone: "3111000004",
    team: "Ciclo Ruta Norte",
    kilometers: 1210,
  },
  {
    email: "corredor05@crit.com",
    fullName: "Sergio Alejandro Vidal",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 105,
    document: "1000000005",
    phone: "3001000005",
    eps: "Famisanar",
    emergencyContactName: "Paula Vidal",
    emergencyContactPhone: "3111000005",
    team: "Team Bogotá",
    kilometers: 1180,
  },
  {
    email: "corredor06@crit.com",
    fullName: "David Santiago Mora",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 106,
    document: "1000000006",
    phone: "3001000006",
    eps: "Salud Total",
    emergencyContactName: "Carmen Mora",
    emergencyContactPhone: "3111000006",
    team: "Rodadores Sur",
    kilometers: 1105,
  },
  {
    email: "corredor07@crit.com",
    fullName: "Óscar Julián Cabrera",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 107,
    document: "1000000007",
    phone: "3001000007",
    eps: "Sanitas",
    emergencyContactName: "Laura Cabrera",
    emergencyContactPhone: "3111000007",
    team: "Rodadores Sur",
    kilometers: 990,
  },
  {
    email: "corredor08@crit.com",
    fullName: "Juan Camilo Ortega",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 108,
    document: "1000000008",
    phone: "3001000008",
    eps: "Nueva EPS",
    emergencyContactName: "Rosa Ortega",
    emergencyContactPhone: "3111000008",
    team: "Ciclo Ruta Norte",
    kilometers: 940,
  },
  {
    email: "corredor09@crit.com",
    fullName: "Fabián Leonardo Pardo",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 109,
    document: "1000000009",
    phone: "3001000009",
    eps: "Compensar",
    emergencyContactName: "Isabel Pardo",
    emergencyContactPhone: "3111000009",
    team: "Team Bogotá",
    kilometers: 870,
  },
  {
    email: "corredor10@crit.com",
    fullName: "Camilo Andrés Herrera",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 110,
    document: "1000000010",
    phone: "3001000010",
    eps: "Famisanar",
    emergencyContactName: "Elena Herrera",
    emergencyContactPhone: "3111000010",
    team: "Rodadores Sur",
    kilometers: 830,
  },
  {
    email: "corredor11@crit.com",
    fullName: "Diego Fernando Lozano",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 111,
    document: "1000000011",
    phone: "3001000011",
    eps: "Salud Total",
    emergencyContactName: "Natalia Lozano",
    emergencyContactPhone: "3111000011",
    team: "Ciclo Ruta Norte",
    kilometers: 760,
  },
  {
    email: "corredor12@crit.com",
    fullName: "Andrés Leonardo Zambrano",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 112,
    document: "1000000012",
    phone: "3001000012",
    eps: "Sanitas",
    emergencyContactName: "Valentina Zambrano",
    emergencyContactPhone: "3111000012",
    team: "Team Bogotá",
    kilometers: 690,
  },
  {
    email: "corredor13@crit.com",
    fullName: "Santiago Esteban Quintero",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 113,
    document: "1000000013",
    phone: "3001000013",
    eps: "Nueva EPS",
    emergencyContactName: "Mónica Quintero",
    emergencyContactPhone: "3111000013",
    team: "Rodadores Sur",
    kilometers: 640,
  },
  {
    email: "corredor14@crit.com",
    fullName: "William Andrés Tovar",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 114,
    document: "1000000014",
    phone: "3001000014",
    eps: "Compensar",
    emergencyContactName: "Adriana Tovar",
    emergencyContactPhone: "3111000014",
    team: "Ciclo Ruta Norte",
    kilometers: 580,
  },
  {
    email: "corredor15@crit.com",
    fullName: "Néstor Raúl Chacón",
    competitionType: "EXPERTOS",
    category: "EXPERTO",
    bibNumber: 115,
    document: "1000000015",
    phone: "3001000015",
    eps: "Famisanar",
    emergencyContactName: "Claudia Chacón",
    emergencyContactPhone: "3111000015",
    team: "Team Bogotá",
    kilometers: 520,
  },
  {
    email: "corredor16@crit.com",
    fullName: "Laura Camila Ávila",
    competitionType: "FEMENINO",
    category: "MUJER",
    bibNumber: 116,
    document: "1000000016",
    phone: "3001000016",
    eps: "Salud Total",
    emergencyContactName: "Jorge Ávila",
    emergencyContactPhone: "3111000016",
    team: "Femenino Bogotá",
    kilometers: 480,
  },
  {
    email: "corredor17@crit.com",
    fullName: "María Fernanda Suárez",
    competitionType: "FEMENINO",
    category: "MUJER",
    bibNumber: 117,
    document: "1000000017",
    phone: "3001000017",
    eps: "Sanitas",
    emergencyContactName: "Pedro Suárez",
    emergencyContactPhone: "3111000017",
    team: "Femenino Bogotá",
    kilometers: 430,
  },
  {
    email: "corredor18@crit.com",
    fullName: "Daniela Alejandra Peña",
    competitionType: "FEMENINO",
    category: "MUJER",
    bibNumber: 118,
    document: "1000000018",
    phone: "3001000018",
    eps: "Nueva EPS",
    emergencyContactName: "Ricardo Peña",
    emergencyContactPhone: "3111000018",
    team: "Femenino Bogotá",
    kilometers: 380,
  },
  {
    email: "corredor19@crit.com",
    fullName: "Valentina Gómez Ruiz",
    competitionType: "FEMENINO",
    category: "MUJER",
    bibNumber: 119,
    document: "1000000019",
    phone: "3001000019",
    eps: "Compensar",
    emergencyContactName: "Héctor Gómez",
    emergencyContactPhone: "3111000019",
    team: "Femenino Bogotá",
    kilometers: 330,
  },
  {
    email: "corredor20@crit.com",
    fullName: "Carolina Marcela Rincón",
    competitionType: "FEMENINO",
    category: "MUJER",
    bibNumber: 120,
    document: "1000000020",
    phone: "3001000020",
    eps: "Famisanar",
    emergencyContactName: "Alberto Rincón",
    emergencyContactPhone: "3111000020",
    team: "Femenino Bogotá",
    kilometers: 280,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Seeded admin user: ${admin.email} (role=${admin.role})`);

  for (const rider of RIDERS) {
    const user = await prisma.user.upsert({
      where: { email: rider.email },
      update: {},
      create: {
        email: rider.email,
        passwordHash,
        role: "USER",
      },
    });

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        fullName: rider.fullName,
        bibNumber: rider.bibNumber,
        category: rider.category,
        kilometers: rider.kilometers,
        team: rider.team,
      },
    });

    await prisma.registration.upsert({
      where: { profileId: profile.id },
      update: {},
      create: {
        profileId: profile.id,
        competitionType: rider.competitionType,
        document: rider.document,
        phone: rider.phone,
        eps: rider.eps,
        emergencyContactName: rider.emergencyContactName,
        emergencyContactPhone: rider.emergencyContactPhone,
      },
    });
  }

  console.log(`Seeded ${RIDERS.length} riders with registration`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
