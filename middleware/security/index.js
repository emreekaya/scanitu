// Basic security middleware without external dependencies

// Rate limiting implementation
const rateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    if (requests.has(key)) {
      const userRequests = requests.get(key).filter(time => time > windowStart);
      requests.set(key, userRequests);
    }

    const userRequests = requests.get(key) || [];

    if (userRequests.length >= max) {
      return res.status(429).json({
        status: 429,
        message: 'Too many requests, please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    userRequests.push(now);
    requests.set(key, userRequests);
    next();
  };
};

// Basic security headers middleware
const securityHeaders = (req, res, next) => {
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');

  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy (basic)
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self'"
  );

  // HTTPS enforcement in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
};

// Request size limiter
const requestSizeLimit = (maxSize = '10mb') => {
  const maxBytes = maxSize.includes('mb')
    ? parseInt(maxSize) * 1024 * 1024
    : parseInt(maxSize);

  return (req, res, next) => {
    const contentLength = parseInt(req.get('content-length') || 0);

    if (contentLength > maxBytes) {
      return res.status(413).json({
        status: 413,
        message: 'Request entity too large'
      });
    }

    next();
  };
};

// IP whitelist middleware (optional)
const ipWhitelist = (allowedIPs = []) => {
  return (req, res, next) => {
    if (allowedIPs.length === 0) {
      return next(); // Skip if no whitelist specified
    }

    const clientIP = req.ip || req.connection.remoteAddress;

    if (!allowedIPs.includes(clientIP)) {
      return res.status(403).json({
        status: 403,
        message: 'Access denied'
      });
    }

    next();
  };
};

module.exports = {
  rateLimiter,
  securityHeaders,
  requestSizeLimit,
  ipWhitelist
};