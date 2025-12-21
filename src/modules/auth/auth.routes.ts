import { Router } from "express";
import { userController } from "../user/user.controller";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup",authController.signUp);
router.post("/signin",authController.signIn); // Placeholder for signin route



export const authRoutes = router;