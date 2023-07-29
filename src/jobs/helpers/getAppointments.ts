// Components import
import { InternalServerError } from "../../helpers/apiError";
import AppointmentModel from "../../models/appointmentModel";
import logger from "../../utils/logger";

const getAppointments = async () => {
    // 1. Get today's and tomorrow's dates
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date();
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
    startOfTomorrow.setHours(0, 0, 0, 0);

    const endOfTomorrow = new Date(startOfTomorrow);
    endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

    // 2. Find all appointments in DB which have appointmentStaus:"Scheduled" && apontmentDate: tomorrow && appointmentCreateDate: not today
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
        logger.error("No appointments found that match the filter criteria.");
        throw new InternalServerError(
            "No appointments found that match the filter criteria.",
            500
        );
    }

    return appointments;
};

export default getAppointments;
