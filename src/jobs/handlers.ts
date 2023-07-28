// Components import
import {
    APPOINTMENT_CONFIRMATION,
    APPOINTMENT_CANCELATION,
} from "../config/smsTemplates";
import { InternalServerError } from "../helpers/apiError";
import AppointmentModel from "../models/appointmentModel";
import sendSms from "../services/sms.Service";
import logger from "../utils/logger";

// Function to get list of appointments
const getAppointments = async (
    template: (date: Date, id: string) => string
) => {
    try {
        // 1. Get today's and tomorrow's dates
        const startOfToday = new Date(); // creates new Date object with current date and time
        startOfToday.setHours(0, 0, 0, 0); // setHours(Hour,Minutes,Seconds,Milliseconds)

        const startOfTomorrow = new Date();
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
        startOfTomorrow.setHours(0, 0, 0, 0);

        const endOfTomorrow = new Date(startOfTomorrow);
        endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

        // 2. Find all appointments in DB which have appointmentStaus:"Scheduled" && apontmentDate: tomorrow && appointmentCreateDate: not today
        const appointments = await AppointmentModel.find({
            appointmentStatus: "Scheduled",
            appointmentDate: {
                $gte: startOfTomorrow, //values that are greater than or equal to startOfTomorrow
                $lt: endOfTomorrow, //values that are less than a specified value.
            },
            appointmentCreateDate: {
                $lt: startOfToday,
            },
        });

        // 3. Prepare data to send sms to. Generate an array of objects (phoneNumber, text) to pass one by one in smsService
        const smsData = appointments.map((appointment) => {
            return {
                recipients: [appointment.customerPhoneNumber],
                text: template(
                    appointment.appointmentDate,
                    appointment.appointmentId
                ),
            };
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
        return smsData;
    } catch (error) {
        logger.error(`Failed to prepare SMS data: ${error}`, { error });
        throw new InternalServerError(
            `Failed to prepare SMS data: ${error}`,
            500,
            error
        );
    }
};

const JobHandlers = {
    // appointmentReminder: async (job: any) => {
    //     try {
    //         const smsData = await getAppointments(APPOINTMENT_CONFIRMATION);
    //         // Send SMS to each appointment
    //         for (let data of smsData) {
    //             try {
    //                 await sendSms(data);
    //                 logger.debug(
    //                     `SMS sent to ${data.recipients} with message: ${data.text}`
    //                 );
    //             } catch (error) {
    //                 logger.error(
    //                     `Failed to send SMS to ${data.recipients}: ${error}`,
    //                     { error }
    //                 );
    //             }
    //         }
    //     } catch (error) {}
    // },
    cancelationRemainder: async (job: any) => {
        try {
            const smsData = await getAppointments(APPOINTMENT_CANCELATION);
            console.log(smsData);

            // Send SMS to each appointment
            for (let data of smsData) {
                try {
                    await sendSms(data);
                    logger.debug(
                        `SMS sent to ${data.recipients} with message: ${data.text}`
                    );
                } catch (error) {
                    logger.error(
                        `Failed to send SMS to ${data.recipients}: ${error}`,
                        { error }
                    );
                }
            }
        } catch (error) {}
    },
};

export default JobHandlers;
