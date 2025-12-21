import { Request, Response } from "express";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (name: string, email: string, password: string, phone: string, role: string) => {

    const hashPassword = await bcrypt.hash(password, 10); // In real scenario, hash the password before storing
    // Logic to handle user signup
    const result = await pool.query(
        "INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, hashPassword, phone, role]
    );
    return result;
}

const signIn = async (email: string, password: string) => {
    // Logic to handle user signin
    const userResult = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    if (userResult.rows.length === 0) {
        throw new Error("User not found");
    }
    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
    const token = jwt.sign({name: user.name, email: user.email, role: user.role}, secret, {expiresIn: '7d'});

    return { user, token };
    

};

export const authService = {
    signUp,signIn
};