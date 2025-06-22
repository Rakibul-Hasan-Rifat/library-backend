import { Schema, model } from "mongoose";
import IBook from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
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

const Book = model("Book", bookSchema);

export default Book;
