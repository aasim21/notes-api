const mongoose = require("mongoose");

const validateNote = (req, res, next) => {
  try {
    const { title, content, folderId } = req.body;
    //Error handling

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof folderId !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    if (
      title.trim() === "" ||
      content.trim() === "" ||
      folderId.trim() === ""
    ) {
      return res.status(400).json({
        message: "Fields cannot be empty",
      });
    }

    if (!mongoose.isValidObjectId(folderId)) {
      return res.status(400).json({
        message: "Invalid folderId",
      });
    }
    next();
  } catch (err) {
     return res.status(500).json({
        message: "Something unexpected happened"
    });
  }
};

module.exports = validateNote;