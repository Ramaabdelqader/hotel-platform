export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ ok:false, error:{message:"Unauthorized"} });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ ok:false, error:{message:"Forbidden"} });
    }
    next();
  };
}
