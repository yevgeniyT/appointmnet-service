// Components import
import {
    APPOINTMENT_CANCELATION,
    APPOINTMENT_REMINDER,
} from "../config/smsTemplates";
import {
    cleanCancelledAppointments,
    cleanExpiredAppointments,
} from "../services/databaseCleanup.service";
import {
    processMultipleReminders,
    processSingleReminder,
} from "./helpers/processReminders";

// Jobs to be done
const JobHandlers = {
    // runs multiple appointment reminder notifications as sms and coment to crm timeline for filtered list of appointments
    appointmentReminderJob: async (job: any) => {
        await processMultipleReminders("appointment", APPOINTMENT_REMINDER);
    },
    // runs multiple cancelation reminder notifications as sms and coment to crm timeline for filtered list of appointments
    cancelationRemainderJob: async (job: any) => {
        await processMultipleReminders("cancelation", APPOINTMENT_CANCELATION);
    },
    // runs single appointment reminder notifications, mostly used when new appointment is just created
    singleAppointmentReminderJob: async (job: any) => {
        const appointmentId = job.attrs.data.appointmentId;
        await processSingleReminder(
            "appointment",
            APPOINTMENT_REMINDER,
            appointmentId
        );
    },
    // runs single cancelation reminder notifications as sms and coment to crm timeline for filtered list of appointments
    singleCancelationReminderJob: async (job: any) => {
        const appointmentId = job.attrs.data.appointmentId;
        await processSingleReminder(
            "cancelation",
            APPOINTMENT_CANCELATION,
            appointmentId
        );
    },
    cleanExpiredAppointmentsJob: async (job: any) => {
        await cleanExpiredAppointments();
    },
    cleanCanselledAppointmentsJob: async (job: any) => {
        await cleanCancelledAppointments();
    },
};

export default JobHandlers;
