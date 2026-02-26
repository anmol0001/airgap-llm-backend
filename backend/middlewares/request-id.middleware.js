const requestId = (req, res, next) => {
  req.id = `OFRABO01-${Date.now()}`;
  res.setHeader('X-Request-Id', req.id);
  next();
}

module.exports = {requestId}