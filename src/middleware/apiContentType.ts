//This is an Express middleware that validates if POST, PUT, or PATCH requests have a JSON content type. If not, it triggers a BadRequestError. Otherwise, it passes control to the next middleware.

import { Request, Response, NextFunction } from "express";

import { BadRequestError } from "../helpers/apiError";

export default function (req: Request, res: Response, next: NextFunction) {
    if (
        (req.method === "POST" ||
            req.method === "PUT" ||
            req.method === "PATCH") &&
        !req.is("application/json") // all requests should be in JSON
    ) {
        next(new BadRequestError("Request body must be of type json"));
    } else {
        next();
    }
}
