"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_variables_1 = require("./app/configs/env.variables");
const server_config_1 = require("./app/configs/server.config");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_config_1.serverConnect)();
        app_1.default.listen(env_variables_1.port, () => {
            console.log(`The app is running at http://localhost:${env_variables_1.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
main();
exports.default = app_1.default;
