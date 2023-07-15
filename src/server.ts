// dependencies import
import errorHandler from "errorhandler";

import app from "./app";

//Error Handler. Provides error handing middleware  only use in development
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler);
}

// Start Express server

app.listen(app.get("port"), () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});
