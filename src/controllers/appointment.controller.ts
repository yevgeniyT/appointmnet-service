// Dependencies import
import { Request, Response, NextFunction } from "express";

// Components import
import appointmentService from "../services/appointment.service";
import { BadRequestError } from "../helpers/apiError";

import schedule from "../jobs/scheduler";

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

        // If appointment is created successfuly use agenda jobs to process sending sms and crm notifications
        if (newAppointment) {
            await schedule.singleAppointmentNotificationSchedule(
                newAppointment.appointmentId.toString()
            ); // pass id to find appointnt in DB later in agenda jobs to send sms anr crm reminder

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
        await schedule.singleAppointmentCancelationSchedule(
            appointmentId.toString()
        );

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
