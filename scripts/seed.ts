import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

async function main() {
  const { ensureSiteData, ensureAdminUser } = await import("../src/lib/seed");
  await ensureSiteData();
  const admin = await ensureAdminUser();
  if (admin.created) {
    console.log("Admin user created from ADMIN_EMAIL / ADMIN_PASSWORD.");
  } else if (admin.missingEnv) {
    console.log("No admin created: set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local");
  } else {
    console.log("Admin already exists — skipped.");
  }
  console.log("Site defaults seeded.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
