const pool = require("../db");

const createNote = async (req, res, next) => {
  try {
    const { title, body } = req.body;

    const newNote = await pool.query(
      "INSERT INTO notes (title, body) VALUES($1, $2) RETURNING *",
      [title, body]
    );

    res.json(newNote.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes JOIN status ON notes.id = status.id");
    res.json(allNotes.rows);
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "note not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const result = await pool.query(
      "UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *",
      [title, body, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "notes not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM notes WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "notes not found" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const getActive = async (req, res) => {
  try {
    const allActive = await pool.query("SELECT * FROM status WHERE status = 'true'");
    res.json(allActive.rows);
  } catch (error) {
    next(error);
  }
};

const getArchive = async (req, res) => {
  try {
    const allActive = await pool.query("SELECT * FROM status WHERE status = 'false'");
    res.json(allActive.rows);
  } catch (error) {
    next(error);
  }
};

const updateActive = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("UPDATE status SET status = NOT status WHERE id = $1 RETURNING *", [id]);
        
        if (result.rowCount === 0)
        return res.status(404).json({ message: "Note not found" });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
  getActive,
  getArchive, 
  updateActive,
};