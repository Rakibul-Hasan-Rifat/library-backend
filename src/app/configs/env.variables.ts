import { configDotenv } from "dotenv";

configDotenv();

export const port = process.env.PORT;
export const mongoUrl = process.env.SERVER_URL;


