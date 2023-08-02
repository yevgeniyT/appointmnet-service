//Components import
import { InternalServerError } from "../helpers/apiError";
import AppointmentModel from "../models/appointmentModel";
import logger from "../utils/logger";

// Reusable function to get the start of a given day
const getStartOfDay = (daysFromNow = 0) => {
    const day = new Date();
    day.setDate(day.getDate() + daysFromNow);
    day.setHours(0, 0, 0, 0);
    return day;
};

const cleanExpiredAppointments = async () => {
    try {
        const startOfTomorrow = getStartOfDay(1);
        const deleted = await AppointmentModel.deleteMany({
            appointmentDate: {
                $lt: startOfTomorrow,
            },
        });
        if (deleted.deletedCount === 0) {
            logger.info("No expired appointments to delete.");
            return false;
        } else {
            logger.info(
                `Deleted ${deleted.deletedCount} expired appointments.`
            );
            return true;
        }
    } catch (error) {
        logger.error(`Failed to delete expired appointments: ${error}`, {
            error,
        });
        throw new InternalServerError(
            `Failed to delete expired appointments: ${error}`,
            500,
            error
        );
    }
};

const cleanCancelledAppointments = async () => {
    try {
        const deleted = await AppointmentModel.deleteMany({
            appointmentStatus: "Cancelled",
        });
        // Check and log if the data were deleted
        if (deleted.deletedCount === 0) {
            logger.info("No cancelled appointments to delete.");
            return false; // in case we will need to hande result in any way
        } else {
            logger.info(
                `Deleted ${deleted.deletedCount} cancelled appointments.`
            );
            return true;
        }
    } catch (error) {
        logger.error(`Failed to delete cancelled appointments: ${error}`, {
            error,
        });
        throw new InternalServerError(
            `Failed to delete cancelled appointments: ${error}`,
            500,
            error
        );
    }
};

export { cleanExpiredAppointments, cleanCancelledAppointments };
