"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("./app/routes/book.route"));
const borrow_route_1 = __importDefault(require("./app/routes/borrow.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/books", book_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
app.get("/", (req, res) => {
    res.send("The app is running online!!");
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send({ message: "Something went wrong from global error", error });
    }
});
exports.default = app;
