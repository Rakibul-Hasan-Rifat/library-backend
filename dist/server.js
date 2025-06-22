"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_variables_1 = require("./app/configs/env.variables");
const server_config_1 = require("./app/configs/server.config");
const main = async () => {
    try {
        await (0, server_config_1.serverConnect)();
        app_1.default.listen(env_variables_1.port, () => {
            console.log(`The app is running at http://localhost:${env_variables_1.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
main();
