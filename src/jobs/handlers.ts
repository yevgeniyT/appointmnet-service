// Components import
import {
    APPOINTMENT_CANCELATION,
    APPOINTMENT_REMINDER,
} from "../config/smsTemplates";
import {
    processMultipleReminders,
    processSingleReminder,
} from "./helpers/processReminders";

// Jobs to be done
const JobHandlers = {
    // runs multiple appointment reminder notifications as sms and coment to crm timeline for filtered list of appointments
    appointmentReminder: async (job: any) => {
        await processMultipleReminders("appointment", APPOINTMENT_REMINDER);
    },
    // runs multiple cancelation reminder notifications as sms and coment to crm timeline for filtered list of appointments
    cancelationRemainder: async (job: any) => {
        await processMultipleReminders("cancelation", APPOINTMENT_CANCELATION);
    },
    // runs single appointment reminder notifications, mostly used when new appointment is just created
    singleAppointmentReminder: async (job: any) => {
        const appointmentId = job.attrs.data.appointmentId;
        await processSingleReminder(
            "appointment",
            APPOINTMENT_REMINDER,
            appointmentId
        );
    },
    singleCancelationReminder: async (job: any) => {
        const appointmentId = job.attrs.data.appointmentId;
        await processSingleReminder(
            "cancelation",
            APPOINTMENT_CANCELATION,
            appointmentId
        );
    },
};

export default JobHandlers;
