// Dependencies import
import dotenv from "dotenv";
import fs from "fs";

// Components import
import { logger } from "../utils/logger";

//Check if the .env file exists. If it does, it loads this file and sets up the environment variables from it. If it doesn't exist, it tries to load the .env.example file instead.
if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables ");
    dotenv.config({ path: ".env" });
} else {
    logger.debug(
        "Using .env.example file to supply config environment variables"
    );
    dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}

// MongoDb
export const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    logger.error(
        "No mongo connection string. Set MONGODB_URI environment variable."
    );
    process.exit(1); //Node.js command that terminates the current process.
}

// JWT
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

if (!JWT_SECRET_KEY) {
    logger.error(
        "No JWT secret key found. Set JWT_SECRET_KEY environment variable."
    );
    process.exit(1); //Node.js command that terminates the current process.
}

// TurboSms Services
export const SMS_AUTH_TOKEN = process.env.SMS_AUTH_TOKEN as string;
export const SMS_BASE_URL = process.env.SMS_BASE_URL as string;
export const SMS_SENDER = process.env.SMS_SENDER as string;

if (!SMS_AUTH_TOKEN) {
    logger.error("No sms auth token. Set SMS_AUTH_TOKEN environment variable");
    process.exit(1);
}

if (!SMS_BASE_URL) {
    logger.error("No sms base url. Set SMS_BASE_URL environment variable");
    process.exit(1);
}

if (!SMS_SENDER) {
    logger.error("No sms sender. Set SMS_SENDER environment variable");
    process.exit(1);
}

// Bitris 24 Services
export const B24_AUTH_TOKEN = process.env.B24_AUTH_TOKEN as string;
export const B24_ADMIN_ID = process.env.B24_ADMIN_ID as string;

if (!B24_AUTH_TOKEN) {
    logger.error(
        "No bitrix 24 auth token. Set B24_AUTH_TOKEN environment variable"
    );
    process.exit(1);
}

if (!B24_ADMIN_ID) {
    logger.error("No bitrix 24 admin ID. B24_ADMIN_ID environment variable");
    process.exit(1);
}
