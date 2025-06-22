"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "The book-title is not allowed to be empty."] },
    author: { type: String, required: [true, "The author of the book must be mentioned."] },
    genre: { type: String, default: "FICTION", required: true },
    isbn: { type: String, required: true, unique: [true, "ISBN must be unique."] },
    description: { type: String },
    copies: { type: Number, min: 0 },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
