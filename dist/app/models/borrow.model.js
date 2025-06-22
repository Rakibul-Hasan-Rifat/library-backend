"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.ObjectId, required: true, ref: "Book" },
    quantity: { type: Number, required: [true, "Quantity is a required field."], min: [1, 'Quantity should be greater than 0.'] },
    dueDate: { type: Date, required: [true, "Due-Date is required to mention."] },
}, {
    versionKey: false,
    timestamps: true
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
