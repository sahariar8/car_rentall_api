import { Request, Response } from "express";
import { userService } from "./user.service";


const getUser = async (req:Request, res:Response) => {
    const {id} = req.params;
    try {
        const result = await userService.getUserById(Number(id));
        res.status(200).json({
            status: "success",
            message: "User profile",
            data: result
        });
    } catch (err:any) {
        
    }
};

const createUser = async (req:Request, res:Response) => {
    const {name, email, password, phone, role} = req.body;
    console.log(req.body);
    try {
        const result = await userService.createUser(name, email, password, phone, role);
        res.status(200).json({
            status: "success",
            message: "User created",
            data: result.rows[0]
        });
    } catch (err:any) {
        res.status(500).json({
            status: "error",
            message: "Failed to create user",
            error: err.message
        });
    }
};

const deleteUser = async (req:Request, res:Response) => {
    const {id} = req.params;
    // Logic to delete user
    try {
        const result = await userService.deleteUser(Number(id));
        res.status(200).json({
            status: "success",
            message: "User deleted",
            data: result.rows[0]
        });
    } catch (error:any) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete user",
            error: error.message,
        });
    }
};


export const userController = {
    getUser,createUser,deleteUser
};