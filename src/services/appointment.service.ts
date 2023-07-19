// Components import
import AppointmentModel, { IAppointment } from "../models/appointmentModel";
import { NotFoundError, ConflictError } from "../helpers/apiError";
import sendSmsService from "./sms.Service";
import { APPOINTMENT_REMINDER } from "../config/smsTemplates";
import sendComment from "./bitrix24.service";

//Types
interface SmsData {
    recipients: string[];
    text: string;
}

const create = async (appointmentData: IAppointment): Promise<IAppointment> => {
    // 1.Check if appointment already exists
    const existingAppointment = await AppointmentModel.findOne({
        appointmentId: appointmentData.appointmentId,
    });
    if (existingAppointment) {
        throw new ConflictError("An appointment with this ID already exists.");
    }
    // 2. Add appointment and save it to DB
    const newAppointment = await AppointmentModel.create(appointmentData);

    // 3. Send sms to patient
    const smsData = {
        recipients: [newAppointment.patientPhoneNumber],
        text: APPOINTMENT_REMINDER(newAppointment.appointmentDate),
    };

    // sendSmsService(smsData as SmsData); //TODO Add error handling when responce
    sendComment();

    return newAppointment;
};

const update = async (
    updatedData: IAppointment,
    appointmetId: string
): Promise<IAppointment> => {
    const foundAppointment = await AppointmentModel.findOneAndUpdate(
        { appointmentId: appointmetId },
        updatedData,
        { new: true }
    );
    if (!foundAppointment) {
        throw new NotFoundError(
            `An appointment with id - ${appointmetId} does not exists.`
        );
    }

    return foundAppointment;
};

const deleteAppointment = async (
    appointmetId: string
): Promise<IAppointment> => {
    const foundAppointment = await AppointmentModel.findOneAndDelete({
        appointmentId: appointmetId,
    });
    if (!foundAppointment) {
        throw new NotFoundError(
            `An appointment with id - ${appointmetId} does not exists.`
        );
    }

    return foundAppointment;
};

export default { create, update, deleteAppointment };
