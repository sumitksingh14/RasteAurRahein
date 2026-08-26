/**
 * Shared Upstash Redis REST client utility.
 * Uses the raw HTTP REST API (no @upstash/redis SDK needed).
 */

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCmd(cmd: string, ...args: (string | number)[]): Promise<unknown> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    throw new Error("Upstash Redis is not configured (UPSTASH_REDIS_REST_URL / TOKEN)");
  }

  const response = await fetch(`${UPSTASH_URL}/${cmd}/${args.map(encodeURIComponent).join("/")}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Redis ${cmd} failed: ${response.status} ${text}`);
  }

  const json = await response.json();
  return json.result;
}

export const redis = {
  /** SET key value [EX seconds] */
  async set(key: string, value: string, exSeconds?: number): Promise<void> {
    if (exSeconds) {
      await redisCmd("set", key, value, "EX", exSeconds);
    } else {
      await redisCmd("set", key, value);
    }
  },

  /** GET key → string | null */
  async get(key: string): Promise<string | null> {
    const result = await redisCmd("get", key);
    return result as string | null;
  },

  /** DEL key */
  async del(key: string): Promise<void> {
    await redisCmd("del", key);
  },

  /** EXISTS key → 0|1 */
  async exists(key: string): Promise<boolean> {
    const result = await redisCmd("exists", key);
    return result === 1;
  },

  /** HSET key field value [field value ...] */
  async hset(key: string, fields: Record<string, string>): Promise<void> {
    const args = Object.entries(fields).flat();
    await redisCmd("hset", key, ...args);
  },

  /** HGETALL key → Record<string,string> | null */
  async hgetall(key: string): Promise<Record<string, string> | null> {
    const result = await redisCmd("hgetall", key);
    if (!result || !Array.isArray(result) || result.length === 0) return null;
    const obj: Record<string, string> = {};
    for (let i = 0; i < result.length; i += 2) {
      obj[result[i] as string] = result[i + 1] as string;
    }
    return obj;
  },

  /** SADD key member → 0|1 */
  async sadd(key: string, member: string): Promise<number> {
    return (await redisCmd("sadd", key, member)) as number;
  },

  /** SREM key member → 0|1 */
  async srem(key: string, member: string): Promise<number> {
    return (await redisCmd("srem", key, member)) as number;
  },

  /** SISMEMBER key member → 0|1 */
  async sismember(key: string, member: string): Promise<boolean> {
    const result = await redisCmd("sismember", key, member);
    return result === 1;
  },

  /** SCARD key → number */
  async scard(key: string): Promise<number> {
    return (await redisCmd("scard", key)) as number;
  },
};
