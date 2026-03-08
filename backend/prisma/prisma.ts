import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

globalForPrisma.prisma = prismaClient;
