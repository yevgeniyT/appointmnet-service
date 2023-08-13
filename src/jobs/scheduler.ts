import { logger } from "../utils/logger";
import agenda from "./index";

const scheduleJob = async (time: string, jobName: string, data: object) => {
    try {
        if (time === "now") {
            agenda.now(jobName, data);
        } else if (time.startsWith("every")) {
            const interval = time.slice(6); // Remove the "every " part of the string
            agenda.every(interval, jobName, data);
        } else {
            agenda.schedule(time, jobName, data);
        }
        logger.info(`${jobName} scheduled`);
    } catch (error) {
        logger.error(`Failed to schedule ${jobName}`, { error });
    }
};

const schedule = {
    multipleAppointmentNotificationSchedule: async () => {
        scheduleJob("in 1 minute", "send appointment reminder", {});
    },
    multipleAppointmentCancelationSchedule: async () => {
        scheduleJob("in 3 minute", "send cancelation reminder", {});
    },
    singleAppointmentNotificationSchedule: async (appointmentId: string) => {
        scheduleJob("now", "send single appointment reminder", {
            appointmentId,
        });
    },
    singleAppointmentCancelationSchedule: async (appointmentId: string) => {
        scheduleJob("now", "send single cancelation reminder", {
            appointmentId,
        });
    },
    clearExpiredAppointmentsSchedule: async () => {
        scheduleJob("now", "clean expired appointments", {});
    },
    clearCancelledApointmentSchedule: async () => {
        scheduleJob("now", "clean cancelled appointments", {});
    },
};
export default schedule;
