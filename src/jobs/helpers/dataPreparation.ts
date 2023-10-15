import { createAppointmentToken } from "../../services/appointmentVarification.service";
import { CLIENT_URL } from "../../config/secrets";
import generateShortCode from "../../helpers/shortCode";
import shortenUrl from "../../services/urlShorten.service";

interface Appointment {
    _id: string;
    customerPhoneNumber: string;
    customerCrmId: string;
    appointmentDate: Date;
    appointmentId: string;
}

type TemplateFunction = (date: Date, id: string, token?: string) => string;

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

const prepareSingleSmsData = async (
    appointment: Appointment,
    template: TemplateFunction
) => {
    const token = createAppointmentToken(
        appointment._id.toString(),
        new Date(appointment.appointmentDate)
    );
    const longUrl = `${CLIENT_URL}/api/v1/appointments/appointment-data/${token}`;
    const shortUrl = await shortenUrl(longUrl);
    return {
        recipients: [appointment.customerPhoneNumber],
        text: template(
            appointment.appointmentDate,
            appointment.appointmentId,
            shortUrl
        ),
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
