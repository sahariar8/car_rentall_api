import { pool } from "../../config/db";


const getUserById = async (id: number) => {
    // Simulate fetching user from database
    const users = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return users;
}

const createUser = async (name: string, email: string, password: string, phone: string, role: string) => {
    // Simulate creating a new user in the database
    const users = await pool.query(
        "INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, password, phone, role]
    );
    return users;
}

const deleteUser = async (id: number) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result;
}

export const userService = {
    getUserById,createUser,deleteUser
};