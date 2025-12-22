import { pool } from "../../config/db";


const getUser = async () => {
    // Simulate fetching user from database
    const users = await pool.query("SELECT * FROM users");
    return users;
}

const updateUser = async (name: string, email: string, password: string, phone: string, role: string,id: number) => {
    // Simulate creating a new user in the database
    const users = await pool.query(
        "UPDATE users SET name = $1, email = $2, password = $3, phone = $4, role = $5 WHERE id = $6 RETURNING *",
        [name, email, password, phone, role,id]
    );
    return users;
}

const deleteUser = async (id: number) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result;
}

export const userService = {
    getUser,updateUser,deleteUser
};