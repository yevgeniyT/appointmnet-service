// Dependencies import
import Agenda from "agenda";

// Components import
import { MONGODB_URI } from "../config/secrets";
import logger from "../utils/logger";
import notificationJobs from "./definitions/notificationJobs";
import cleanDataBaseJobDefinitions from "./definitions/cleanDataBaseJobs";

// Establish connection to mongoDB
const agenda = new Agenda({
    db: { address: MONGODB_URI },
});

// Listen for ready or error events
agenda.on("ready", () => {
    logger.info("Agenda is ready");
});

agenda.on("error", (error: Error) => {
    logger.error("Agenda connecting error", error);
});

//define agenda jobs
notificationJobs(agenda);
cleanDataBaseJobDefinitions(agenda);

export default agenda;
