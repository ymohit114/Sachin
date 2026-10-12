interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      if (now > record.resetTime) {
        memoryStore.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes default
): { isAllowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = memoryStore.get(identifier);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    memoryStore.set(identifier, { count: 1, resetTime });
    return {
      isAllowed: true,
      remaining: maxRequests - 1,
      resetTime,
    };
  }

  if (record.count >= maxRequests) {
    return {
      isAllowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count += 1;
  return {
    isAllowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  };
}
