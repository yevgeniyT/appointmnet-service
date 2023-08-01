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

// Not deleting document from DB but change status to "Cancelled". All documents will be deleted at the end of day through agenda jobs
const deleteAppointment = async (
    appointmentId: string
): Promise<IAppointment> => {
    const foundAppointment = await AppointmentModel.findOne({
        appointmentId: appointmentId,
    });

    if (!foundAppointment) {
        throw new NotFoundError(
            `An appointment with id - ${appointmentId} does not exists.`
        );
    }

    foundAppointment.appointmentStatus = "Cancelled";
    await foundAppointment.save();

    return foundAppointment;
};

export default { create, update, deleteAppointment };
