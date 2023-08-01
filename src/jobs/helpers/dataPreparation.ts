interface Appointment {
    customerPhoneNumber: string;
    customerCrmId: string;
    appointmentDate: Date;
    appointmentId: string;
}

type TemplateFunction = (date: Date, id: string) => string;

const prepareMultipleSmsData = (
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

const prepareMultipleCrmData = (
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

const prepareSingleSmsData = (
    appointment: Appointment,
    template: TemplateFunction
) => {
    return {
        recipients: [appointment.customerPhoneNumber],
        text: template(appointment.appointmentDate, appointment.appointmentId),
    };
};

const prepareSingleCrmData = (
    appointment: Appointment,
    template: TemplateFunction
) => {
    return {
        customerId: appointment.customerCrmId,
        text: template(appointment.appointmentDate, appointment.appointmentId),
    };
};

export {
    prepareMultipleSmsData,
    prepareMultipleCrmData,
    prepareSingleSmsData,
    prepareSingleCrmData,
};
