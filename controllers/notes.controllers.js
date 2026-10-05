const result = require("../data/data");
const Note = require("../models/notes.model");
const Folder = require("../models/folders.model");

const getNotes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const { folderId, sort } = req.query;

    //Filtering
    const filter = {
      userId: req.user.userId,
    };

    if (folderId) {
      filter.folderId = folderId;
    }

    //Sorting
    let sortoption = { createdAt: -1 };
    if (sort == "oldest") {
      sortoption = { createdAt: 1 };
    }

    const notes = await Note.find(filter)
      .sort(sortoption)
      .skip(skip)
      .limit(limit)
      .lean();

    //Count filtered notes
    const totalNotes = await Note.countDocuments(filter);
    const totalPages = Math.ceil(totalNotes / limit);

    return res.status(200).json({ notes, page, limit, totalPages, totalNotes });
  } catch (error) {
    console.error("Fetching notes failed:", error);
    return res.status(500).json({ message: "Failed to fetch notes" });
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const target_note = await Note.findOne({
      _id: id,
      userId: req.user.userId,
    }).populate("folderId");
    if (!target_note)
      return res.status(404).json({ message: "Note Not Found" });
    res.json(target_note);
  } catch (error) {
    console.error("Failed to find:", error);
    return res.status(500).json({
      message: "Something unexpected happened",
    });
  }
};

//New Note
const createNote = async (req, res, next) => {
  try {
    const { title, content, folderId } = req.body;
    const folder = await Folder.findOne({
      _id: folderId,
      userId: req.user.userId,
    });
    if (!folder) return res.status(404).json({ message: "Folder Not Found" });
    const newNote = {
      title,
      content,
      userId: req.user.userId,
      folderId,
    };
    await Note.create(newNote);

    return res.status(201).json({ message: "New note created" });
  } catch (error) {
     next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (title === undefined && content === undefined) {
      return res.status(400).json({ message: "No fields are provided" });
    }
    const updates = {};

    if (title !== undefined) {
      updates.title = title;
    }
    if (content !== undefined) {
      updates.content = content;
    }
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      updates,
      { new: true },
    );
    if (!updatedNote) return res.status(404).json({ message: "Not Found" });
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!deletedNote) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
