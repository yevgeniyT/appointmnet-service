interface Appointment {
    customerPhoneNumber: string;
    customerCrmId: string;
    appointmentDate: Date;
    appointmentId: string;
}

type TemplateFunction = (date: Date, id: string) => string;

const prepareSmsData = (
    appointmens: Appointment[],
    template: TemplateFunction
) => {
    return appointmens.map((appointment) => {
        return {
            recipients: [appointment.customerPhoneNumber],
            text: template(
                appointment.appointmentDate,
                appointment.appointmentId
            ),
        };
    });
};

const prepareCrmData = (
    appointmens: Appointment[],
    template: TemplateFunction
) => {
    return appointmens.map((appointment) => {
        return {
            customerId: appointment.customerCrmId,
            text: template(
                appointment.appointmentDate,
                appointment.appointmentId
            ),
        };
    });
};

export { prepareSmsData, prepareCrmData };
