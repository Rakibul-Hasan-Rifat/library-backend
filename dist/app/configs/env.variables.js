"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUrl = exports.port = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.port = process.env.PORT;
exports.mongoUrl = process.env.SERVER_URL;
