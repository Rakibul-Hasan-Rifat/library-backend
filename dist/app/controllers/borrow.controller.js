"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBorrowBook = exports.getBorrowBooksDetails = void 0;
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
// logics to get the details of borrowed books
const getBorrowBooksDetails = async (req, res) => {
    try {
        const borrows = await borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                    doc: { $push: "$$ROOT" },
                },
            },
            { $unwind: "$doc" },
            {
                $lookup: {
                    from: "books",
                    localField: "doc.book",
                    foreignField: "_id",
                    as: "book",
                },
            },
            { $project: { _id: false, doc: false } },
            { $unwind: "$book" },
            { $project: { "book.title": true, "book.isbn": true } },
        ]);
        res.send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrows,
        });
    }
    catch (error) {
        res.send({ success: false, message: error.message, error: error });
    }
};
exports.getBorrowBooksDetails = getBorrowBooksDetails;
// logics to borrow books
const postBorrowBook = async (req, res) => {
    try {
        const { book, quantity, dueDate } = req.body;
        const result = await book_model_1.default.findOneAndUpdate({ _id: book, copies: { $gte: quantity } }, { $inc: { copies: -quantity } }, { returnDocument: "after" });
        if (!result) {
            res.send({
                success: false,
                message: "Not found or Not enough in stock",
                error: "The book-id is either not found in book collection or it has not enough number of quantity in stock",
            });
            return;
        }
        const postBorrow = await borrow_model_1.default.create({ book, quantity, dueDate });
        res.send({
            success: true,
            message: "Book borrowed successfully",
            data: postBorrow,
        });
    }
    catch (error) {
        res.send({ success: false, message: error.message, error: error });
    }
};
exports.postBorrowBook = postBorrowBook;
