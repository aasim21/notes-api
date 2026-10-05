const express = require("express");
const {getNote, getNotes, createNote, updateNote, deleteNote} = require("../controllers/notes.controllers");
const authenticate = require("../middlewares/auth.middleware");
const validateNote = require("../middlewares/validateNote.middleware");

const router = express.Router();

router.get("/", authenticate, getNotes);

//Specific note
router.get("/:id", authenticate, getNote);

//Add notes
router.post("/", authenticate,validateNote, createNote);

//Update existing notes
router.patch("/:id", authenticate, updateNote);

router.delete("/:id", authenticate, deleteNote);

module.exports = router;