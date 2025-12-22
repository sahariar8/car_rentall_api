import { NextFunction, Request, Response } from "express";


export const adminOrSelf = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    const targetUserId = Number(req.params.userId);

    if (user.role === "admin" || user.id === targetUserId) {
      return next();
    }

    return res.status(403).json({ status: "error", message: "Forbidden: Admin or owner only" });
  };
};


export default adminOrSelf;
