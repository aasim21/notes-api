const express = require('express');
const helmet = require("helmet");
const notesRouter = require("./routes/notes.routes");
const authRouter = require("./routes/auth.routes");
const folderRouter = require("./routes/folders.routes");
const errorHandler = require("./middlewares/error.middleware");
const morgan = require("morgan");
const logger = require("./config/logger");

//Node app
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("combined", {
    stream: {
        write: (message) => {
            logger.http(message.trim());
        }
    }
}));
//Routes

app.use("/api/notes", notesRouter);
// app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/folders", folderRouter);

app.use(errorHandler);

module.exports = app;



