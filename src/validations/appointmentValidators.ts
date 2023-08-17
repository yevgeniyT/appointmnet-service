// Import the necessary functions from the express-validator package
import { body } from "express-validator";

// Define the validation rules for the appointment schema
const appointmentValidationRules = [
    body("appointmentId").notEmpty().withMessage("Appointment ID is required"),

    body("appointmentDate")
        .notEmpty()
        .withMessage("Appointment date is required")
        .isISO8601()
        .withMessage("Appointment date should be a valid ISO 8601 date format"),

    body("appointmentCreateDate")
        .notEmpty()
        .withMessage("Appointment creation date is required")
        .isISO8601()
        .withMessage(
            "Appointment creation date should be a valid ISO 8601 date format"
        ),

    body("appointmentStatus")
        .notEmpty()
        .withMessage("Appointment status is required")
        .isIn([
            "Not Confirmed",
            "Scheduled",
            "Patient Waiting",
            "In Session",
            "Completed",
            "No Show",
            "Cancelled",
        ])
        .withMessage("Invalid appointment status"),

    body("customerCrmId").notEmpty().withMessage("Customer CRM ID is required"),

    body("customerPhoneNumber")
        .notEmpty()
        .withMessage("Customer phone number is required")
        // Matches Ukrainian mobile phone numbers
        .matches(/^380\d{2}\d{7}$/)
        .withMessage("Customer phone number should be in format 380501234567"),

    body("isKid")
        .optional()
        .isBoolean()
        .withMessage("isKid should be a boolean value"),
];

export { appointmentValidationRules };
