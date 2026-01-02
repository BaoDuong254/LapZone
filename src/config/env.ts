import fs from "fs";
import path from "path";
import { config } from "dotenv";
import z from "zod";
import chalk from "chalk";

const envPath = path.resolve(process.cwd(), ".env");

// Only load .env file if it exists (development mode)
// In production, Docker Compose injects env vars directly
if (fs.existsSync(envPath)) {
  config({ path: envPath });
} else if (process.env.NODE_ENV !== "production") {
  console.error(chalk.red("Can not find .env file at path:"), chalk.yellow(envPath));
  process.exit(1);
}

const configSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.string(),
  SESSION_SECRET: z.string(),
  ADMIN_EMAIL: z.email(),
  ADMIN_PASSWORD: z.string().min(6).max(20),
  ADMIN_NAME: z.string().min(1),
});

const configServer = configSchema.safeParse(process.env);

if (!configServer.success) {
  console.log("Config validation error:");
  console.log(z.treeifyError(configServer.error));
  process.exit(1);
}

const envConfig = configServer.data;

export default envConfig;
