const logger = require("../config/logger");

const errorHandler  = (err, req, res, next) => {

    logger.error(err);
    return res.status(500).json(
        {message:"Something unexpected happened"}
    );
}

module.exports = errorHandler;