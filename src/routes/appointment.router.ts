//Dependencies import
import express from "express";

//Components import
import {
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointment,
} from "../controllers/appointment.controller";

const router = express.Router();

//Every path we define here will get /api/v1/appointments
router.post("/", addAppointment);
router.put("/:appointmentId", updateAppointment);
router.delete("/:appointmentID", deleteAppointment);
router.get("/", getAppointment);

export default router;
