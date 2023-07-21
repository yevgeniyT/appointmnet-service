// Dependencies import
import Agenda from "agenda";

// Components import
import { MONGODB_URI } from "../config/secrets";
import logger from "../utils/logger";
import initialReminderJob from "./initialRemindersJob";

const agenda = new Agenda({
    db: { address: MONGODB_URI },
});

// Add listeners
agenda.on("ready", () => {
    logger.info("Agenda is connected to MongoDB and is ready");
    // Define jobs after Agenda is ready
    const jobName = "send initial appointment reminder";
    initialReminderJob(agenda);
    agenda.now(jobName, {});
    // Don't forget to start agenda
    agenda.start();
});

agenda.on("error", (error: Error) => {
    logger.error("Error connecting Agenda to MongoDB", error);
});

export default agenda;
