"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_variables_1 = require("./env.variables");
const serverConnect = async () => {
    try {
        await mongoose_1.default.connect(env_variables_1.mongoUrl);
        console.log("The connection with server is built successfully!!!");
    }
    catch (error) {
        console.log(" Something went wrong", error.message);
    }
};
exports.serverConnect = serverConnect;
