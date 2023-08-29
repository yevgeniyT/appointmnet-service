import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { InvalidInputError } from "../helpers/apiError";
import { logger } from "../utils/logger";

const runValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);
        //isEmpty() method of express validation to quicly understand if there any validation errors
        if (!errors.isEmpty()) {
            {
                const errorMessage = errors.array()[0].msg;
                logger.error(`Validation error: ${errorMessage}`); // Log the validation error

                // Create a new InvalidInputError with the validation message and pass it to the error handler
                const error = new InvalidInputError(errorMessage);
                return next(error);
            }
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

export default runValidation;
