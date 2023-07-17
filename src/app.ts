// Dependencies import
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

//Components import
import apiContentType from "./middleware/apiContentType";
import apiErrorHandler from "./middleware/apiErrorHandler";
import appointmentRouter from "../src/routes/appointment.router";

dotenv.config({ path: ".env" }); //reads the .env file in the root of the project, parses it, and populates the process.env object with the values.

const app = express();

// Express configuration
app.set("port", process.env.PORT); //set the value of the 'port' setting to whatever is stored in the environment variable PORT
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiContentType);

// Set up routers
app.use("/api/vi/appointments", appointmentRouter);

// Custom API error handler
app.use(apiErrorHandler);

export default app;
