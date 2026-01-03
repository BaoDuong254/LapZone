import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "generated/prisma/client";
import envConfig from "config/env";

const adapter = new PrismaMariaDb({
  host: envConfig.DATABASE_HOST,
  user: envConfig.DATABASE_USER,
  password: envConfig.DATABASE_PASSWORD,
  database: envConfig.DATABASE_NAME,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn", "error"] : ["error"],
});
