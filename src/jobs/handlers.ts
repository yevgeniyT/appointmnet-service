// Dependencies import
import { APPOINTMENT_CONFIRMATION } from "../config/smsTemplates";
import { InternalServerError } from "../helpers/apiError";
import AppointmentModel from "../models/appointmentModel";

const JobHandlers = {
    initialReminder: async (job: any) => {
        try {
            // 1. Get today's and tomorrow's dates
            const startOfToday = new Date(); // creates new Date object with current date and time
            startOfToday.setHours(0, 0, 0, 0); // setHours(Hour,Minutes,Seconds,Milliseconds)
            // console.log(startOfToday);

            const startOfTomorrow = new Date();
            startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
            startOfTomorrow.setHours(0, 0, 0, 0);

            const endOfTomorrow = new Date(startOfTomorrow);
            endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

            // 2. Find all appointments in DB which have appointmentStaus:"Scheduled" && apontmentDate: tomorrow && appointmentCreateDate: not today
            const appointments = await AppointmentModel.find({
                appointmentStatus: "Scheduled",
                appointmentDate: {
                    $gte: startOfTomorrow, //values that are greater than or equal to a specified value.
                    $lt: endOfTomorrow, //values that are less than a specified value.
                },
                appointmentCreateDate: {
                    $lt: startOfToday,
                },
            });

            // 3. Prepare data to send sms to. Generate an array of objects (phoneNumber, text) to pass one by one in smsService
            const smsData = appointments.map((appointment) => {
                return {
                    phoneNumber: appointment.customerPhoneNumber,
                    text: APPOINTMENT_CONFIRMATION(appointment.appointmentDate),
                };
            });

            console.log(smsData);
        } catch (error) {
            throw new InternalServerError(
                `Failed to prepare SMS data: ${error}`,
                500,
                error
            );
        }
    },
    resendReminder: async (job: any) => {},
    cancelationRemainder: async (job: any) => {},
};

export default JobHandlers;
