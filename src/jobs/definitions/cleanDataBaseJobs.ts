// Components import
import JobHandlers from "../handlers";

const cleanDataBaseJobDefinitions = (agenda: any) => {
    agenda.define(
        "clean expired appointments",
        JobHandlers.cleanExpiredAppointmentsJob
    );
    agenda.define(
        "clean cancelled appointments",
        JobHandlers.cleanCanselledAppointmentsJob
    );
};

export default cleanDataBaseJobDefinitions;
