import mongoose from "mongoose";

export interface IAppointment extends Document {
    appointmentId: string;
    patientPhoneNumber: string;
    guardianPhoneNumber: string;
    appointmentDate: Date;
    doctorName: string;
    appointmentStatus: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema(
    {
        appointmentId: {
            type: String,
            required: true,
        },
        patientPhoneNumber: {
            type: String,
        },
        guardianPhoneNumber: {
            type: String,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        doctorName: {
            type: String,
            required: true,
        },
        appointmentStatus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status",
        },
    },
    { timestamps: true }
);

const AppointmentModel = mongoose.model<IAppointment>(
    "Appointments",
    appointmentSchema
);

export default AppointmentModel;
