"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const bookRoute = (0, express_1.Router)();
bookRoute.route("/").get(book_controller_1.getBooks).post(book_controller_1.postBook);
bookRoute.route("/:bookId").get(book_controller_1.getSingleBook).put(book_controller_1.updateBook);
exports.default = bookRoute;
