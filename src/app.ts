// Dependencies import
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";

//Components import
import apiContentType from "./middleware/apiContentType";
import apiErrorHandler from "./middleware/apiErrorHandler";
import appointmentRouter from "./routes/appointment.router";

dotenv.config({ path: ".env" }); //reads the .env file in the root of the project, parses it, and populates the process.env object with the values.

const app = express();

app.use(morgan("dev"));

// Express configuration
app.set("port", process.env.PORT); //set the value of the 'port' setting to whatever is stored in the environment variable PORT
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(apiContentType);

// healty check
app.get("/", (req, res) => {
    res.status(200).send({ status: "ok" });
});

// Set up routers
app.use("/api/v1/appointments", appointmentRouter);

// Custom API error handler
app.use(apiErrorHandler);

export default app;
