// Components import
import JobHandlers from "../handlers";

const notificationJobDefinitions = (agenda: any) => {
    agenda.define(
        "send appointment reminder",
        JobHandlers.appointmentReminderJob
    );
    agenda.define(
        "send cancelation reminder",
        JobHandlers.cancelationRemainderJob
    );
    agenda.define(
        "send single appointment reminder",
        JobHandlers.singleAppointmentReminderJob
    );
    agenda.define(
        "send single cancelation reminder",
        JobHandlers.singleCancelationReminderJob
    );
};

export default notificationJobDefinitions;
