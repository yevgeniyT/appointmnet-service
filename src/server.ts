// dependencies import
import errorHandler from "errorhandler";

import app from "./app";
import { connectDB } from "./config/db";
import logger from "./utils/logger";
import agenda from "./jobs";
import schedule from "./jobs/scheduler";

// Start logging
logger.info("Server is starting...");

//Error Handler. Provides error handing middleware only use in development
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler);
}
// Connect to MongoDB
connectDB();

// Start Agenda
// agenda.start().then(() => {
//     schedule.reminderSchedule();
//     schedule.cancelationSchedule();
// });

// Start Express server
app.listen(app.get("port"), () => {
    logger.info(
        `App is running at http://localhost:${app.get("port")} in ${app.get(
            "env"
        )} mode`
    );
    logger.info("Press CTRL-C to stop\n");
});
