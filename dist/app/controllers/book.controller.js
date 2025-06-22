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
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.postBook = exports.getBooks = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
// all books reader
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { filter, sortBy, limit = 10 } = req.query;
    console.log(filter, sortBy, limit);
    const capitalizedFilter = typeof filter === "string" && filter.toUpperCase();
    const limitConvertedToNumber = typeof limit !== "number" ? parseInt(limit) : limit;
    const filterObj = capitalizedFilter ? { genre: capitalizedFilter } : {};
    sortBy = sortBy ? sortBy : "createdAt";
    console.log("filterObj", filterObj);
    try {
        const books = yield book_model_1.default.find(filterObj)
            .sort({ [sortBy]: 1 })
            .limit(limitConvertedToNumber);
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.send({ success: false, message: error.message, error: error });
    }
});
exports.getBooks = getBooks;
// create operation logic
const postBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newBook = yield book_model_1.default.create(body);
        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        res.send({ success: false, message: error.message, error: error });
    }
});
exports.postBook = postBook;
// single book reader operation
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.default.findById(bookId);
        res.send({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.send({ success: false, message: error.message, error: error });
    }
});
exports.getSingleBook = getSingleBook;
// update operation logic
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, params } = req;
        const book = yield book_model_1.default.findByIdAndUpdate(params.bookId, body, {
            returnDocument: "after",
        });
        res.send({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.send({ success: false, message: error.message, error: error });
    }
});
exports.updateBook = updateBook;
// delete operation logics
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.default.findByIdAndDelete(bookId);
        res.status(204).send({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.send({ success: false, message: error.message, error: error });
    }
});
exports.deleteBook = deleteBook;
