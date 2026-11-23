import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import os from "os";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function getPrismaClient(): PrismaClient {
  const sourceDbPath = path.join(process.cwd(), "prisma", "dev.db");
  let dbUrl = `file:${sourceDbPath}`;

  // When deployed on Vercel (serverless environment with read-only filesystem except temp dir)
  if (process.env.VERCEL) {
    const tmpDbPath = path.join(os.tmpdir(), "dev.db");
    try {
      if (!fs.existsSync(tmpDbPath) && fs.existsSync(sourceDbPath)) {
        fs.copyFileSync(sourceDbPath, tmpDbPath);
      }
      if (fs.existsSync(tmpDbPath)) {
        dbUrl = `file:${tmpDbPath}`;
      }
    } catch (e) {
      console.error("Failed to copy sqlite db to tmp directory:", e);
    }
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });
}

export const prisma = globalForPrisma.prisma || getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
