// Befor it was in app.ts but looger component was initilised first and .env values were undefined
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
