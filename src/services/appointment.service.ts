// Components import
import AppointmentModel, { IAppointment } from "../models/appointmentModel";
import { NotFoundError, ConflictError } from "../helpers/apiError";

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
    return newAppointment;
};

const update = async (
    updatedData: IAppointment,
    appointmetId: string
): Promise<IAppointment> => {
    // 1.Check if appointment already exists
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

export default { create, update };
