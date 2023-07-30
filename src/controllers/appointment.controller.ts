// Dependencies import
import { Request, Response, NextFunction } from "express";

// Components import
import appointmentService from "../services/appointment.service";
import { BadRequestError } from "../helpers/apiError";
import { APPOINTMENT_REMINDER } from "../config/smsTemplates";
import sendSmsService from "./../services/sms.Service";
import logger from "../utils/logger";

//Types
interface SmsData {
    recipients: string[];
    text: string;
}

// POST /appointments
const addAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const appointmentData = req.body;
        const newAppointment = await appointmentService.create(appointmentData);

        // If appointment is created successfuly
        if (newAppointment) {
            // 3. Prepare sms data
            const smsData = {
                recipients: [newAppointment.customerPhoneNumber],
                text: APPOINTMENT_REMINDER(
                    newAppointment.appointmentDate,
                    newAppointment.appointmentId
                ),
            };
            // Send SMS asynchronously and handle any errors
            sendSmsService(smsData as SmsData).catch((error) => {
                logger.error(`Failed to send on create SMS: ${error}`);
            });
            return res.json(newAppointment);
        }
    } catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new BadRequestError("Invalid Request", 400, error));
        } else {
            next(error);
        }
    }
};

// PUT /appointments/:appointmentId
const updateAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updateData = req.body;
        const appointmentId = req.params.appointmentId;
        const updateAppointment = await appointmentService.update(
            updateData,
            appointmentId
        );

        return res.json(updateAppointment);
    } catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new BadRequestError("Invalid Request", 400, error));
        } else {
            next(error);
        }
    }
};

// DELETE /appointments/:appointmentId
const deleteAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const appointmentId = req.params.appointmentID;
        await appointmentService.deleteAppointment(appointmentId);
        res.status(204).end();
    } catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new BadRequestError("Invalid Request", 400, error));
        } else {
            next(error);
        }
    }
};

export { addAppointment, updateAppointment, deleteAppointment };
