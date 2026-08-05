import { headers } from "next/headers";
import { getEnv } from "@/lib/cloudflare";
export async function requireAdmin() {
  const env = getEnv();
  if (env.ADMIN_BYPASS === "true") return { email: "local-dev@apex" };
  const h = await headers();
  const email = h.get("cf-access-authenticated-user-email")?.toLowerCase();
  const allowed = (env.ADMIN_EMAILS || "").split(",").map(v=>v.trim().toLowerCase()).filter(Boolean);
  if (!email || !allowed.includes(email)) throw new Error("UNAUTHORISED");
  return { email };
}
