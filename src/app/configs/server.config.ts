import mongoose from "mongoose"
import { mongoUrl } from "./env.variables"

export const serverConnect = async () => {
    try {
        await mongoose.connect(mongoUrl as string)
        console.log("The connection with server is built successfully!!!");        
    } catch (error: any) {
        console.log(" Something went wrong", error.message);
    }
}