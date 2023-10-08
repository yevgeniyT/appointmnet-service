// Dependencies import
import jwt, { JwtPayload } from "jsonwebtoken";

//Components import
import { InternalServerError } from "../helpers/apiError";
import { JWT_SECRET_KEY } from "../config/secrets";

interface AppointmentPayload extends JwtPayload {
    appointmentId: string;
    appointmentDate: Date;
}

const createAppointmentToken = (
    appointmentId: string,
    appointmentDate: Date
): string => {
    try {
        // Get the current date and time
        const now = new Date();

        // Calculate the number of seconds between now and the appointment date
        const expiresIn = Math.floor(
            (appointmentDate.getTime() - now.getTime()) / 1000
        );

        const payload = { _id: appointmentId };

        const token: string = jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn,
        });
        return token;
    } catch (error) {
        throw new InternalServerError(
            "Failed to create appointment token from appointmentVarification.service component",
            500,
            error
        );
    }
};

const verifyAppointmentToken = (token: string): AppointmentPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as AppointmentPayload;
        return decoded;
    } catch (error) {
        throw new InternalServerError(
            "Failed to verify appointment token from appointmentVarification.service component",
            500,
            error
        );
    }
};

export { createAppointmentToken, verifyAppointmentToken };
