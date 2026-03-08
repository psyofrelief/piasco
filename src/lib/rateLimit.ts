const lru = new Map();

export function rateLimit(ip: string) {
  const now = Date.now();
  const windowSize = 60 * 1000;
  const maxRequests = 10;

  const userData = lru.get(ip) || { count: 0, start: now };

  if (now - userData.start > windowSize) {
    userData.count = 1;
    userData.start = now;
  } else {
    userData.count++;
  }

  lru.set(ip, userData);
  return userData.count <= maxRequests;
}
