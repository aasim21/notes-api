const Folder = require("../models/folders.model");
const Note = require("../models/notes.model");
const mongoose = require("mongoose");

//Finding all the folders
const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.userId });
    return res.status(200).json(folders);
  } catch (error) {
    console.error("Folders fetching failed:", error.message);
    return res.status(500).json({ message: "Something unexpected happened" });
  }
};

//Finding one folder
const getFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findOne({ _id: id, userId: req.user.userId });
    if (!folder) return res.status(404).json({ message: "Not Found" });
    return res.status(200).json(folder);
  } catch (error) {
    console.error("Folder fetching failed:", error.message);
    return res.status(500).json({ message: "Something unexpected happened" });
  }
};

//Creating a new Folder
const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    await Folder.create({
      name,
      userId: req.user.userId,
    });
    return res.status(201).json({ message: "Folder created successfully" });
  } catch (error) {
    console.error("Failed to create folder:", error.message);
    return res.status(500).json({ message: "Something unexpected happened" });
  }
};

//Updating a folder
const updateFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { name: name },
      { new: true },
    );
    if (!updatedFolder) return res.status(404).json({ message: "Not Found" });
    return res.status(200).json(updatedFolder);
  } catch (error) {
    console.error("Updating folder Failed", error.message);
    return res.status(500).json({ message: "Something unexpected happened" });
  }
};

//Delete a folder
const deleteFolder = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { id } = req.params;
    session.startTransaction();
    const folder = await Folder.findOne(
      { _id: id, userId: req.user.userId },
      null,
      { session },
    );
    if (!folder) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Folder Not Found" });
    }
    await Note.deleteMany({ folderId: id }, { session });
    await Folder.findByIdAndDelete(id, { session });
    throw new Error("Testing transaction rollback");
    await session.commitTransaction();
    res.status(204).send();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

module.exports = {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
};
