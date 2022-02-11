const router = require("express").Router();
const pool = require("../db");

// Get all folders
router.get("/", async (req, res) => {
    try {
        const allFolders = await pool.query(`
        SELECT
            id,
            name,
            color_id
        FROM
            folder;
        `);
        // Feedback to client
        res.json(allFolders.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Add new folder
router.post("/", async (req, res) => {
    try {
        const { folderName, colorId } = req.body;
        const userId = req.session?.user?.userId;
        const addFolder = await pool.query(`
        INSERT INTO
            folder (name, color_id, user_id)
        VALUES
            ($1, $2, $3);
        `,
            [folderName, colorId, userId]);
        res.json(`Project «${folderName}» has been created`);
    } catch (error) {
        console.error(error.message);
    }
});

// Update folder

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { folderName, colorId } = req.body;
        console.log(req.body);
        const updateFolder = await pool.query(`
            UPDATE
                folder
            SET
                name = $2,
                color_id = $3
            WHERE
                id = $1;`
            , [id, folderName, colorId]);
        // Feedback to client
        res.json("Project has been updated");
    } catch (error) {
        console.error(error.message);
    }
})

// Delete folder
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTasks = await pool.query(`DELETE FROM task WHERE folder_id = $1;`, [id]);
        const deleteFolder = await pool.query(`DELETE FROM folder WHERE id = $1;`, [id]);
        // Feedback to client
        res.json("Folder has been deleted")
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;