/**
 * Rate limiting
 *
 * This is a simple rate limiting based on:
 *   - https://github.com/vercel/next.js/tree/main/examples/api-routes-rate-limit
 */
import { LRUCache } from "lru-cache";
import { NextResponse } from "next/server";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        return isRateLimited ? reject() : resolve();
      }),
  };
}

const limiter = rateLimit({
  interval: 2 * 1000,
  uniqueTokenPerInterval: 500,
});

export function withRateLimit(handler: any) {
  return async (req: Request, res: Response) => {
    try {
      // Note: Update the limit and token as needed
      await limiter.check(10, process.env.LRU_CACHE_TOKEN!);
      return await handler(req, res);
    } catch (error) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }
  };
}
