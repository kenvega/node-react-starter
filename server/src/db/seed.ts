/*
  Database seeding.

  Two kinds of data live here, and they behave differently:

    * Reference data — rows the application needs in EVERY environment,
      including production. Always runs.
    * Local sample data — throwaway accounts so the app is usable right after a
      reset. Skipped on any database that is not local.

  Run with: npm run db:seed
*/
import env from "@/env.js";
import { closePool, query } from "@/infrastructure/database/client.js";
import { hashPassword } from "@/shared/hash.js";
import type { UserRole } from "@/schemas/users.schema.js";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/*
  Reference data the application cannot work without: lookup tables, plans,
  categories, default settings.

  Every statement must be idempotent (ON CONFLICT DO NOTHING / DO UPDATE),
  because this runs on every deploy.

  Empty for now — this schema has no data it requires to function. `role` is a
  column with a default, not a lookup table. Add statements here as the app
  grows, or put them in the migration that introduces the table they belong to.
*/
const REFERENCE_DATA: string[] = [];

/*
  Emails use the .test TLD, which RFC 6761 reserves so it can never resolve to
  a real domain. `daysAgo` staggers created_at so the list view's
  "ORDER BY created_at DESC" and its date formatting are actually observable.
*/
const SAMPLE_USERS: { email: string; role: UserRole; daysAgo: number }[] = [
  { email: "admin@example.test", role: "admin", daysAgo: 30 },
  { email: "member@example.test", role: "member", daysAgo: 21 },
  {
    // Long on purpose: exercises the overflow-wrap styling in the users list.
    email: "a-very-long-email-address-to-check-layout-wrapping@example.test",
    role: "member",
    daysAgo: 14,
  },
  { email: "member2@example.test", role: "member", daysAgo: 9 },
  // A second admin, so demoting an admin can be tested without using your own account.
  { email: "admin2@example.test", role: "admin", daysAgo: 6 },
  { email: "member3@example.test", role: "member", daysAgo: 3 },
  { email: "member4@example.test", role: "member", daysAgo: 1 },
  { email: "member5@example.test", role: "member", daysAgo: 0 },
];

/*
  A predicate rather than an assertion: seeding must still succeed in
  production, it just has to leave the sample accounts out.
*/
function isLocalDatabase(): boolean {
  if (process.env["NODE_ENV"] === "production") {
    return false;
  }

  const { hostname } = new URL(env.DATABASE_URL);

  return LOCAL_HOSTS.has(hostname);
}

function readSampleDataPassword(): string {
  const password = process.env["SAMPLE_DATA_PASSWORD"];

  if (!password) {
    throw new Error(
      "SAMPLE_DATA_PASSWORD is not set. Add it to server/.env — see .env.example."
    );
  }

  return password;
}

async function loadReferenceData(): Promise<void> {
  for (const statement of REFERENCE_DATA) {
    await query(statement);
  }

  console.log(`Reference data: ${REFERENCE_DATA.length} statement(s) applied.`);
}

async function loadSampleData(password: string): Promise<void> {
  for (const user of SAMPLE_USERS) {
    // Hashed per user so no two accounts share a hash.
    const hashedPassword = await hashPassword(password);
    const createdAt = new Date(Date.now() - user.daysAgo * 24 * 60 * 60 * 1000);

    /*
      DO UPDATE rather than DO NOTHING: re-running after changing the password
      or the list should re-sync existing rows instead of silently skipping them.
    */
    await query(
      `INSERT INTO users (email, password, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $4)
       ON CONFLICT (email) DO UPDATE
       SET password = EXCLUDED.password,
           role = EXCLUDED.role,
           created_at = EXCLUDED.created_at,
           updated_at = EXCLUDED.updated_at`,
      [user.email, hashedPassword, user.role, createdAt]
    );
  }

  console.log(`Sample data: ${SAMPLE_USERS.length} user(s) loaded.`);
}

async function seed(): Promise<void> {
  await loadReferenceData();

  if (!isLocalDatabase()) {
    console.log("Sample data: skipped (database is not local).");
    return;
  }

  await loadSampleData(readSampleDataPassword());
}

try {
  await seed();
} finally {
  await closePool();
}
