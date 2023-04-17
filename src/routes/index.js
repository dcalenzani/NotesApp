const { Router } = require("express");
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
  updateActive,
  getActive,
  getArchive,
} = require("../controllers/index.controller");

const router = Router();

// create a Note
router.post("/notes/new", createNote);

router.get("/notes/", getAllNotes);

router.get("/notes/:id", getNote);

router.put("/notes/:id", updateNote);

router.delete("/notes/:id", deleteNote);

router.get("/filter/active", getActive);

router.get("/filter/archive", getArchive);

router.put("/filter/:id", updateActive);


module.exports = router;