//Dependencies import
import express from "express";

//Components import

const router = express.Router();

//Every path we define here will get /api/v1/appointments
router.post("/"); //create
router.put("/:appointmentId"); // update
router.delete("/:appointmentID"); // delete

export default router;
