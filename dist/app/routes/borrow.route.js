"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("../controllers/borrow.controller");
const borrowBookRoute = (0, express_1.Router)();
borrowBookRoute.route("/").get(borrow_controller_1.getBorrowBooksDetails).post(borrow_controller_1.postBorrowBook);
exports.default = borrowBookRoute;
