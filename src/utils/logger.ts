import winston from "winston";

const options: winston.LoggerOptions = {
    format: winston.format.combine(
        winston.format.colorize(), // Add color to logs
        winston.format.printf(({ level, message }) => {
            return `[${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
        }),
    ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
