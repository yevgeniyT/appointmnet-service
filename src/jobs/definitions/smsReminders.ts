import JobHandlers from "../handlers";

const smsDefinitions = (agenda: any) => {
    agenda.define(
        "send initial appointment reminder",
        JobHandlers.initialReminder
    );
    agenda.define("resend  appointment reminder", JobHandlers.resendReminder);
    agenda.define(
        "cancelation appointment reminder",
        JobHandlers.cancelationRemainder
    );
};

export default smsDefinitions;
