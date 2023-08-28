// Dependencies import
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Component imports
import { appointmentValidationRules } from "../../validations/appointmentValidators";

//Mocking the request object
const mockRequest = (body: any) => ({
    body,
});

// Mocking the response object
const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mocking the next function
const mockNext = () => jest.fn();

describe("Appointment Validation Rules", () => {
    it("should fail if appontmentId is not provided", async () => {
        const req = mockRequest({
            /* missing appointmentId */
        });
        const next = mockNext();

        // Run the specific validation rule for 'appointmentId'
        await appointmentValidationRules[0].run(req);
        const result = validationResult(req);

        expect(result.isEmpty()).toBeFalsy();
        expect(result.array()[0].msg).toBe("Appointment ID is required");
    });
});
