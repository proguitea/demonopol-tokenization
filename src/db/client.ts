import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | undefined;

/**
 * Lazily construct a database client. Throws only when actually called,
 * so `pnpm build` and `pnpm typecheck` don't require DATABASE_URL — only
 * the request handlers that touch the DB do.
 */
export function getDb() {
  if (cachedDb) return cachedDb;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local — see PROVISIONING.md.",
    );
  }
  const client = postgres(url, { prepare: false, max: 1 });
  cachedDb = drizzle(client, { schema });
  return cachedDb;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export type Db = ReturnType<typeof getDb>;
