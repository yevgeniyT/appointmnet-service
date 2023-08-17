//Dependencies import
import express from "express";

//Components import
import {
    addAppointment,
    updateAppointment,
    deleteAppointment,
} from "../controllers/appointment.controller";
import { appointmentValidationRules } from "../validations/appointmentValidators";
import runValidation from "../validations";

const router = express.Router();

//Every path we define here will get /api/v1/appointments
router.post("/", appointmentValidationRules, runValidation, addAppointment);
router.put("/:appointmentId", updateAppointment);
router.delete("/:appointmentID", deleteAppointment);

export default router;
