// Dependencies import
import winston from "winston";
import WinstonCloudwatch from "winston-cloudwatch";

const isProduction = process.env.NODE_ENV === "production";
console.log(isProduction);
console.log(process.env.NODE_ENV);

//Define configuration for AWS logs upload
const LogsCloudWatchConfig = {
    level: "error",
    logGroupName: "appointment-app/application-logs",
    logStreamName: "App-logs",
    awsRegion: "eu-central-1",
};
// Define configuration for AWS HTTP/morgan logs upload
// const morganCloudWatchConfig = {
//     ...LogsCloudWatchConfig,
//     logStreamName: "HTTP-logs",
// };

const options: winston.LoggerOptions = {
    format: winston.format.combine(
        // winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize(), // Add color to logs
        winston.format.printf(({ level, message }) => {
            return `[${level}]: ${message}`;
        })
    ),
    transports: isProduction
        ? [new WinstonCloudwatch(LogsCloudWatchConfig)]
        : [new winston.transports.Console({ level: "debug" })],
};

// const morganLoggerOptions: winston.LoggerOptions = {
//     ...options,
//     transports: [new WinstonCloudwatch(morganCloudWatchConfig)],
// };

const logger = winston.createLogger(options);
// const morganLogger = winston.createLogger(morganLoggerOptions);

if (!isProduction) {
    logger.debug("Logging initialized at debug level");
}

export { logger };

//TODO Add morgan looger to AWS
