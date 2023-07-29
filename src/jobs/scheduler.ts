import logger from "../utils/logger";
import agenda from "./index";

const schedule = {
    reminderSchedule: async () => {
        try {
            agenda.schedule("in 1 minute", "send appointment reminder", {});
            logger.info("Appointment reminder scheduled");
        } catch (error) {
            logger.error("Failed to schedule appointment reminder", { error });
        }
    },
    cancelationSchedule: async () => {
        try {
            agenda.schedule("in 3 minute", "send cancelation reminder", {});
            logger.info("Cancelation reminder scheduled");
        } catch (error) {
            logger.error("Failed to schedule cancelation reminder", { error });
        }
    },
};

export default schedule;
