const securityHeaders = (req, res, next) => {
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Basic XSS protection (legacy but still checked in VAPT)
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Force HTTPS (important since you run HTTPS)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains'
  );

  // Do not leak referrer information
  res.setHeader('Referrer-Policy', 'no-referrer');

  // Very strict CSP (API-only backend)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; frame-ancestors 'none';"
  );

  next();
}

module.exports = {securityHeaders}