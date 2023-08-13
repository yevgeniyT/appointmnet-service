// Components import
import { InternalServerError } from "../../helpers/apiError";
import AppointmentModel from "../../models/appointmentModel";
import { logger } from "../../utils/logger";

// Get today's and tomorrow's dates
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const startOfTomorrow = new Date();
startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
startOfTomorrow.setHours(0, 0, 0, 0);

const endOfTomorrow = new Date(startOfTomorrow);
endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

const getMutipleAppointments = async () => {
    try {
        // 1. Find all appointments in DB which have appointmentStaus:"Scheduled" && apontmentDate: tomorrow && appointmentCreateDate: not today
        const appointments = await AppointmentModel.find({
            appointmentStatus: "Scheduled",
            appointmentDate: {
                $gte: startOfTomorrow,
                $lt: endOfTomorrow,
            },
            appointmentCreateDate: {
                $lt: startOfToday,
            },
        });

        if (appointments.length === 0) {
            logger.error(
                "No appointments found that match the filter criteria."
            );
            throw new InternalServerError(
                "No appointments found that match the filter criteria.",
                500
            );
        }

        return appointments;
    } catch (error) {
        logger.error(`Failed to get appointment: ${error}`, { error });
        throw new InternalServerError(
            `Failed to get appointment: ${error}`,
            500,
            error
        );
    }
};

const getSingleAppointment = async (appointmentId: string) => {
    try {
        const appointment = await AppointmentModel.findOne({
            appointmentId: appointmentId,
        });
        if (!appointment) {
            throw new InternalServerError(
                "No appointment found that match the filter criteria.",
                500
            );
        }
        return appointment;
    } catch (error) {
        logger.error(`Failed to get appointment: ${error}`, { error });
        throw new InternalServerError(
            `Failed to get appointment: ${error}`,
            500,
            error
        );
    }
};

export { getMutipleAppointments, getSingleAppointment };
