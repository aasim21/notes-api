const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
            index: true
        },
    },
    {timestamps: true}
);

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;