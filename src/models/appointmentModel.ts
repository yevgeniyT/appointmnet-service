import mongoose from "mongoose";

export interface IAppointment extends mongoose.Document {
    appointmentId: string;
    patientPhoneNumber?: string;
    guardianPhoneNumber?: string;
    appointmentDate: Date;
    doctorName: string;
    appointmentStatus:
        | "Not Confirmed"
        | "Scheduled"
        | "Patient Waiting"
        | "Patient in Chair"
        | "Appointment Completed"
        | "Appointment Did Not Occur"
        | "Appointment Cancelled";
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
            type: String,
            enum: [
                "Not Confirmed",
                "Scheduled",
                "Patient Waiting ",
                "Patient in Chair",
                "Appointment Completed",
                "Appointment Did Not Occur",
                "Appointment Cancelled",
            ],
        },
    },
    { timestamps: true }
);

const AppointmentModel = mongoose.model<IAppointment>(
    "Appointments",
    appointmentSchema
);

export default AppointmentModel;
