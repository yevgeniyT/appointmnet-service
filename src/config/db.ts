// Dependencies import
import mongoose from "mongoose";

import { MONGODB_URI } from "./secrets";
import { logger } from "../utils/logger";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error(
            "MongoDB connection error. Please make sure MongoDB is running. " +
                error
        );
        process.exit(1);
    }
};
