const logger = (req, res, next) => {
  const start = Date.now();
  const date = new Date().toISOString();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    console.log(`[${date}] ${method} ${originalUrl} - IP: ${ip} - Status: ${statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = logger;