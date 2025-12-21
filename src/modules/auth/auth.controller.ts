import { Request, Response } from "express";
import { authService } from "./auth.service";


const signUp = async (req: Request, res: Response) => {
    // Logic to handle user signup
    const { name, email, password, phone, role } = req.body;
    try {
        const result = await authService.signUp(name, email, password, phone, role);
        res.status(200).json({
            status: "success",
            message: "User signed up",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: "Failed to sign up user",
            error: error.message,
        });
    }
}

const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await authService.signIn(email, password);
        res.status(200).json({
            status: "success",
            message: "User signed in",
            data: result.user,
            token: result.token
        });
    } catch (err: any) {
        res.status(500).json({
            status: "error",
            message: "Failed to sign in user",
            error: err.message,
        });
    }
}
export const authController = {
    signUp,signIn
};