export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    error: {
      message: err.message || "Internal Server Error",
      code: err.code || "SERVER_ERROR",
      details: err.details || null
    }
  });
}
