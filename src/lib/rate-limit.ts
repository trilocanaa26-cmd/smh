import { createHash } from "node:crypto";

const maxSubmissionsPerMinute = 5;

export async function isContactRateLimited(request: Request) {
  const endpoint = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!endpoint || !token) throw new Error("Rate-limit service is not configured");

  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ??
    "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");
  const key = `contact:${ipHash}:${Math.floor(Date.now() / 60_000)}`;
  const pipelineUrl = new URL(endpoint);
  if (!pipelineUrl.pathname.replace(/\/+$/, "").endsWith("/pipeline")) {
    pipelineUrl.pathname = `${pipelineUrl.pathname.replace(/\/+$/, "")}/pipeline`;
  }
  const response = await fetch(pipelineUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, 90],
    ]),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Rate-limit service request failed with status ${response.status}`);
  }
  const result = (await response.json()) as { result?: unknown }[];
  const count = Number(result[0]?.result);
  if (!Number.isFinite(count)) throw new Error("Rate-limit response was invalid");
  return count > maxSubmissionsPerMinute;
}
