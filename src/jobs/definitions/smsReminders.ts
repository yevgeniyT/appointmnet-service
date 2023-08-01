// Components import
import JobHandlers from "../handlers";

const smsDefinitions = (agenda: any) => {
    agenda.define("send appointment reminder", JobHandlers.appointmentReminder);
    agenda.define(
        "send cancelation reminder",
        JobHandlers.cancelationRemainder
    );
    agenda.define(
        "send single appointment reminder",
        JobHandlers.singleAppointmentReminder
    );
    agenda.define(
        "send single cancelation reminder",
        JobHandlers.singleCancelationReminder
    );
};

export default smsDefinitions;
