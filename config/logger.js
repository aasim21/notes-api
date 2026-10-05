const winston = require("winston");

const logger = winston.createLogger({
    level: "http",

    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
    ),

    transports: [new winston.transports.Console()]
});

module.exports = logger;