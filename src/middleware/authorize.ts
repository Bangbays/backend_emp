import { RequestHandler } from "express";

export const authorize = (roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden: akses ditolak" });
      return;
    }
    next();
  };
};
