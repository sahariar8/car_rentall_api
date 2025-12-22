import { Request, Response } from "express";
import { userService } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      status: "success",
      message: "User profile",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user",
      error: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  const { userId } = req.params;
  try {
    const result = await userService.updateUser(
      name,
      email,
      password,
      phone,
      role,
      Number(userId)
    );
    res.status(200).json({
      status: "success",
      message: "User updated",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
      error: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  // Logic to delete user
  console.log(userId);
  try {
    const result = await userService.deleteUser(Number(userId));
    res.status(200).json({
      status: "success",
      message: "User deleted",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

export const userController = {
  getUser,
  updateUser,
  deleteUser,
};
