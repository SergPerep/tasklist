import pool from "../../configs/dbConnection";
import { Request, Response } from "express";

const folder_list = async (req: Request, res: Response) => {
    try {
        const userId = req.session?.user?.userId;
        const allFolders = await pool.query(`
        SELECT
            id,
            name,
            color_id
        FROM
            folder
        WHERE
            folder.user_id = $1;
        `, [userId]);
        // Feedback to client
        res.json(allFolders.rows);
    } catch (error: any) {
        console.error(error.message);
    }
}

const folder_create_post = async (req: Request, res: Response) => {
    try {
        const { folderName, colorId } = req.body;
        const userId = req.session?.user?.userId;
        const addFolder = await pool.query(`
        INSERT INTO
            folder (name, color_id, user_id)
        VALUES
            ($1, $2, $3)
        RETURNING 
            id;
        `,
            [folderName, colorId, userId]);
        const folderId = await addFolder.rows[0].id;
        res.json({ folderId });
    } catch (error: any) {
        console.error(error.message);
    }
}

const folder_update_put = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userId = req.session?.user?.userId;
        const { folderName, colorId } = req.body;
        console.log(req.body);
        const updateFolder = await pool.query(`
            UPDATE
                folder
            SET
                name = $3,
                color_id = $4
            WHERE
                id = $1 AND user_id = $2;`
            , [id, userId, folderName, colorId]);
        const isUpdateSuccessful = updateFolder.rowCount > 0;
        if (!isUpdateSuccessful) return res.status(404).json({ messageToUser: "No such folder related to this user" });
        // Feedback to client
        res.json({ messageToUser: "Project has been updated" });
    } catch (error: any) {
        console.error(error.message);
    }
}

const folder_delete = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userId = req.session?.user?.userId;

        await pool.query(`DELETE FROM task WHERE folder_id = $1 AND user_id = $2;`, [id, userId]);

        const deleteFolder = await pool.query(`DELETE FROM folder WHERE id = $1 AND user_id = $2;`, [id, userId]);
        const isUpdateSuccessful = deleteFolder.rowCount > 0;
        if (!isUpdateSuccessful) return res.status(404).json({ messageToUser: "No such folder related to this user" });

        // Feedback to client
        res.json({ messageToUser: "Folder has been deleted" })
    } catch (error: any) {
        console.error(error.message);
    }
}

export default {
    folder_list,
    folder_create_post,
    folder_update_put,
    folder_delete
}