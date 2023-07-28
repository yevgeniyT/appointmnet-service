import JobHandlers from "../handlers";

const smsDefinitions = (agenda: any) => {
    // agenda.define("send appointment reminder", JobHandlers.appointmentReminder);
    agenda.define(
        "send cancelation reminder",
        JobHandlers.cancelationRemainder
    );
};

export default smsDefinitions;
