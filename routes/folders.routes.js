const express  = require("express");
const {createFolder, getFolders, getFolder, updateFolder, deleteFolder} = require("../controllers/folders.controllers");
const authenticate =  require("../middlewares/auth.middleware");

const router = express.Router();

//Fetching all folders belonging to a User
router.get("/", authenticate, getFolders);

//Fetching a folder by id
router.get("/:id", authenticate, getFolder);

//Creating a new Folder
router.post("/", authenticate, createFolder);

//Updating existing folder
router.patch("/:id", authenticate, updateFolder);

//Deleting a folder by id
router.delete("/:id", authenticate, deleteFolder);

module.exports = router;