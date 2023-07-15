//import dependencies
import express from "express";
import dotenv from "dotenv";

import apiContentType from "./middleware/apiContentType";
import apiErrorHandler from "./middleware/apiErrorHandler";

dotenv.config({ path: ".env" }); //reads the .env file in the root of the project, parses it, and populates the process.env object with the values.

const app = express();

// Express configuration
app.set("port", process.env.PORT); //set the value of the 'port' setting to whatever is stored in the environment variable PORT

app.use(apiContentType);

// Custom API error handler
app.use(apiErrorHandler);

export default app;
