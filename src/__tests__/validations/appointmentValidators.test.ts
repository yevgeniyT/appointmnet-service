// Dependencies import
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Component imports
import { appointmentValidationRules } from "../../validations/appointmentValidators";

//Mocking the request object
const mockRequest = (body: any): Partial<Request> => ({
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
const mockNext = (): Partial<NextFunction> => jest.fn();

describe("Appointment Validation Rules", () => {
    it("should fail if appointmentId is not provided", async () => {
        // Arrange: Create a mock request object with missing appointmentId and a mock next function
        const req = mockRequest({});
        const next = mockNext();

        // Act: Run the specific validation rule for 'appointmentId'
        await appointmentValidationRules[0].run(req);
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate a missing 'appointmentId'
        expect(result.array()[0].msg).toBe("Appointment ID is required");

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if appointmentDate is not provided", async () => {
        // Arrange: Create a mock request object with missing appointmentCreateDate and a mock next function
        const req = mockRequest({});
        const next = mockNext();

        // Act: Run the specific validation rule for 'appointmentCreateDate'
        await appointmentValidationRules[1].run(req); // Assuming this is the 4th rule in your array
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate a missing 'appointmentCreateDate'
        expect(result.array()[0].msg).toBe("Appointment date is required");

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if appointmentDate is not in ISO8601 format", async () => {
        // Arrange: Create a mock request object with wrong Date format and a mock next function
        const req = mockRequest({ appointmentDate: "some-wrong-format" });
        const next = mockNext();

        // Act: Run the specific validation rule for 'appointmentDate format'
        await appointmentValidationRules[1].run(req);
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate a missing 'appointmentId'
        expect(result.array()[0].msg).toBe(
            "Appointment date should be a valid ISO 8601 date format"
        );

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if appointmentCreateDate is not provided", async () => {
        // Arrange: Create a mock request object with missing appointmentCreateDate and a mock next function
        const req = mockRequest({});
        const next = mockNext();

        // Act: Run the specific validation rule for 'appointmentCreateDate'
        await appointmentValidationRules[2].run(req);
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate a missing 'appointmentCreateDate'
        expect(result.array()[0].msg).toBe(
            "Appointment creation date is required"
        );

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if appointmentCreateDate is not in ISO8601 format", async () => {
        // Arrange: Create a mock request object with wrong Date format and a mock next function
        const req = mockRequest({ appointmentCreateDate: "some-wrong-format" });
        const next = mockNext();

        // Act: Run the specific validation rule for 'appointmentCreateDate format'
        await appointmentValidationRules[2].run(req);
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate a missing 'appointmentId'
        expect(result.array()[0].msg).toBe(
            "Appointment creation date should be a valid ISO 8601 date format"
        );

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if appointmentStatus is not one of allowed values", async () => {
        // Arrange: Create a mock request object with invalid appointmentStatus and a mock next function
        const req = mockRequest({ appointmentStatus: "Invalid Status" });
        const next = mockNext();

        // Act: Run the specific validation rule for 'appointmentStatus'
        await appointmentValidationRules[3].run(req);
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate an invalid 'appointmentStatus'
        expect(result.array()[0].msg).toBe("Invalid appointment status");

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if customerCrmId is not provided", async () => {
        // Arrange: Create a mock request object with missing appointmentId and a mock next function
        const req = mockRequest({});
        const next = mockNext();

        // Act: Run the specific validation rule for 'customerCrmId'
        await appointmentValidationRules[4].run(req);
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate a missing 'appointmentId'
        expect(result.array()[0].msg).toBe("Customer CRM ID is required");

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if customerPhoneNumber is not provided", async () => {
        // Arrange: Create a mock request object with missing customerPhoneNumber and a mock next function
        const req = mockRequest({});
        const next = mockNext();

        // Act: Run the specific validation rule for 'customerPhoneNumber'
        await appointmentValidationRules[5].run(req);
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate a missing 'customerPhoneNumber'
        expect(result.array()[0].msg).toBe("Customer phone number is required");

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should fail if customerPhoneNumber format is invalid", async () => {
        // Arrange: Create a mock request object with invalid customerPhoneNumber format and a mock next function
        const req = mockRequest({
            customerPhoneNumber: "12345",
        });
        const next = mockNext();

        // Act: Run the specific validation rule for 'customerPhoneNumber'
        await appointmentValidationRules[5].run(req); // Assuming this is the 5th rule in your array
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate an invalid 'customerPhoneNumber' format
        expect(result.array()[0].msg).toBe(
            "Customer phone number should be in format 380501234567"
        );

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
    it("should pass if isKid is not provided", async () => {
        // Arrange: Create a mock request object with missing isKid and a mock next function
        const req = mockRequest({});
        const next = mockNext();

        // Act: Run the specific validation rule for 'isKid'
        await appointmentValidationRules[6].run(req); // Assuming this is the 6th rule in your array
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate success (empty)
        expect(result.isEmpty()).toBeTruthy();

        // Expect that 'next' middleware could be invoked, as validation should pass
        expect(next).not.toHaveBeenCalled(); // or toHaveBeenCalled() based on your actual middleware logic
    });
    it("should fail if isKid is not a boolean", async () => {
        // Arrange: Create a mock request object with non-boolean isKid and a mock next function
        const req = mockRequest({ isKid: "not-a-boolean" }) as Partial<Request>;
        const next = mockNext();

        // Act: Run the specific validation rule for 'isKid'
        await appointmentValidationRules[6].run(req); // Assuming this is the 6th rule in your array
        const result = validationResult(req);

        // Assert: Check the results

        // Expect that the validation result should indicate failure (not empty)
        expect(result.isEmpty()).toBeFalsy();

        // Expect that the first error message should indicate an invalid 'isKid' value
        expect(result.array()[0].msg).toBe("isKid should be a boolean value");

        // Expect that 'next' middleware is not invoked, because validation should fail
        expect(next).not.toHaveBeenCalled();
    });
});
