// Components import
import {
    APPOINTMENT_CANCELATION,
    APPOINTMENT_REMINDER,
} from "../config/smsTemplates";

import processReminder from "./helpers/processReminders";

// Jobs to be done
const JobHandlers = {
    appointmentReminder: async (job: any) => {
        await processReminder("appointment", APPOINTMENT_REMINDER);
    },
    cancelationRemainder: async (job: any) => {
        await processReminder("cancelation", APPOINTMENT_CANCELATION);
    },
};

export default JobHandlers;
