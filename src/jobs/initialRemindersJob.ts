// Components import

import AppointmentModel from "../models/appointmentModel";
import { APPOINTMENT_CONFIRMATION } from "../config/smsTemplates";
import { InternalServerError } from "../helpers/apiError";

const initialReminderJob = (agenda: any) => {
    agenda.define("send initial appointmenr reminder", async (job: any) => {
        try {
            console.log("job");

            // 1. Get today's and tomorrow's dates
            const startOfToday = new Date(); // creates new Date object with current date and time if empty
            startOfToday.setHours(0, 0, 0, 0); // setHours(Hour,Minutes,Seconds,Milliseconds)

            const startOfTomorrow = new Date();
            startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
            startOfTomorrow.setHours(0, 0, 0, 0);

            const endOfTomorrow = new Date(startOfTomorrow);
            endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

            // 2. Find all appointments in DB which have appointmentStaus:"Scheduled" && apontmentDate: tomorrow && appointmentCreateDate: not today

            const appointments = await AppointmentModel.find({
                appointmentStatus: "Schedueld",
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
    });
};

export default initialReminderJob;
