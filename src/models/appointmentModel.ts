import mongoose from "mongoose";

export interface IAppointment extends mongoose.Document {
    appointmentId: string;
    appointmentDate: Date;
    appointmentCreateDate: Date;
    appointmentStatus:
        | "Not Confirmed"
        | "Scheduled"
        | "Patient Waiting"
        | "In Session"
        | "Completed"
        | "No Show"
        | "Cancelled";
    customerCrmId: string;
    customerPhoneNumber: string;
    isKid: boolean;
}

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentCreateDate: {
        type: Date,
        required: true,
    },
    appointmentStatus: {
        type: String,
        enum: [
            "Not Confirmed",
            "Scheduled",
            "Patient Waiting",
            "In Session",
            "Completed",
            "No Show",
            "Cancelled",
        ],
        default: "Not Confirmed",
    },
    customerCrmId: {
        type: String,
        required: true,
    },
    customerPhoneNumber: {
        type: String,
        required: true,
    },
    isKid: {
        type: Boolean,
        default: true,
    },
});

const AppointmentModel = mongoose.model<IAppointment>(
    "Appointments",
    appointmentSchema
);

export default AppointmentModel;
