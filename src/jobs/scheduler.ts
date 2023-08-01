import logger from "../utils/logger";
import agenda from "./index";

const schedule = {
    reminderSchedule: async () => {
        try {
            agenda.schedule("in 1 minute", "send appointment reminder", {});
            logger.info("Multiple appointment reminders scheduled");
        } catch (error) {
            logger.error("Failed to schedule multiple appointment reminders", {
                error,
            });
        }
    },
    cancelationSchedule: async () => {
        try {
            agenda.schedule("in 3 minute", "send cancelation reminder", {});
            logger.info("Multiple cancelation reminders scheduled");
        } catch (error) {
            logger.error("Failed to schedule multiple cancelation reminders", {
                error,
            });
        }
    },
    singleAppointmentSchedule: async (appointmentId: string) => {
        try {
            agenda.now("send single appointment reminder", { appointmentId });
            logger.info("Single appointment reminder scheduled");
        } catch (error) {
            logger.error("Failed to schedule single appointment reminder", {
                error,
            });
        }
    },
    singleCancelationSchedule: async (appointmentId: string) => {
        try {
            agenda.now("send single cancelation reminder", { appointmentId });
            logger.info("Single cancelation reminder scheduled");
        } catch (error) {
            logger.error("Failed to schedule single cancelation reminder", {
                error,
            });
        }
    },
};

export default schedule;
