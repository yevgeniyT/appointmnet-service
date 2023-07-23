import agenda from "./index";

const schedule = {
    testSchedule: async (data: any) => {
        await agenda.now("test", data);
    },
};

export default schedule;
