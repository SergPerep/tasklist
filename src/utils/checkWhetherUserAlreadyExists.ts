import pool from "../configs/dbConnection";

export default async (username: String) => {
    try {
        const dbData = await pool.query("SELECT id FROM users WHERE username=$1", [username]);
        const isUserAlreadyExists = dbData.rows.length !== 0;
        return isUserAlreadyExists;
    } catch (error: any) {
        console.error(error.message);
    }
}