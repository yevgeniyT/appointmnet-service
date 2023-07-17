// Dependencies import
import { Request, Response, NextFunction } from "express";

// Components import
import appointmentService from "../services/appointment.service";
import { BadRequestError } from "../helpers/apiError";

// POST /appointments
const addAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newAppointment = await appointmentService.create(req.body);

        return res.json(newAppointment);
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
        const update = req.body;
        const appointmentId = req.params.appointmentId;
        const updatedAppointment = await appointmentService.update(
            update,
            appointmentId
        );

        return res.json(updatedAppointment);
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
    } catch (error) {}
};

//GET /appointmens
const getAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json("all correct");
    } catch (error) {}
};
export { addAppointment, updateAppointment, deleteAppointment, getAppointment };
