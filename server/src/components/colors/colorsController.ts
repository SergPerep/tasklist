import pool from "../../configs/dbConnection";
import { Request, Response } from "express";

const color_list = async (req: Request, res: Response) => {
    const colors = await pool.query(`
        SELECT
            id,
            name,
            value
        FROM 
            color`);
    // Feedback to client
    res.json(colors.rows);
}

export default {
    color_list
}