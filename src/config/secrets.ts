// Dependencies import
import dotenv from "dotenv";
import fs from "fs";

// Components import
import logger from "../utils/logger";

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

export const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    logger.error(
        "No mongo connection string. Set MONGODB_URI environment variable."
    );
    process.exit(1); //Node.js command that terminates the current process.
}
