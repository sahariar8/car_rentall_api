import { NextFunction, Request, Response } from "express";


export const adminOnly = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (user.role !== "admin") {
      return res.status(403).json({ status: "error", message: "Forbidden: Admins only" });
    }
    next();
  };
};

export default adminOnly;