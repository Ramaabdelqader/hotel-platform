import { AuditLog } from "../models/index.js";
export function audit(entityType) {
  return async (req, res, next) => {
    res.on("finish", async () => {
      const method = req.method;
      const action = method === "POST" ? "CREATE" : method === "PUT" || method==="PATCH" ? "UPDATE" : method==="DELETE" ? "DELETE" : null;
      if (!action) return;
      try {
        await AuditLog.create({
          userId: req.user?.id || null,
          action,
          entityType,
          entityId: res.locals?.entityId || null,
          details: { path: req.originalUrl, body: req.body }
        });
      } catch {}
    });
    next();
  };
}
