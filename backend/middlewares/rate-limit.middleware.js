const rateStore = new Map();

/**
 * @param {Object} options
 * @param {number} options.windowMs - time window in ms
 * @param {number} options.max - max requests per window
 */
function rateLimit({ windowMs, max }) {
  return (req, res, next) => {
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress;

    const key = `${ip}:${req.baseUrl}${req.path}`;
    const now = Date.now();

    const entry = rateStore.get(key);

    if (!entry) {
      rateStore.set(key, { count: 1, startTime: now });
      return next();
    }

    if (now - entry.startTime > windowMs) {
      rateStore.set(key, { count: 1, startTime: now });
      return next();
    }

    if (entry.count >= max) {
      return res.status(429).json({
        error: 'Too many requests',
      });
    }

    entry.count += 1;
    next();
  };
}

module.exports = { rateLimit };
