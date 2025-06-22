import { Request, Response } from "express";
import Book from "../models/book.model";

// all books reader
export const getBooks = async (req: Request, res: Response) => {
  let { filter, sortBy, limit = 10 } = req.query;
  console.log(filter as string, sortBy, limit as number);

  const capitalizedFilter = typeof filter === "string" && filter.toUpperCase();
  const limitConvertedToNumber: number =
    typeof limit !== "number" ? parseInt(limit as string) : limit;

  const filterObj = capitalizedFilter ? { genre: capitalizedFilter } : {};
  sortBy = sortBy ? sortBy : "createdAt";
  console.log("filterObj", filterObj);

  try {
    const books = await Book.find(filterObj)
      .sort({ [sortBy as string]: 1 })
      .limit(limitConvertedToNumber);
    res.send({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.send({ success: false, message: error.message, error: error });
  }
};

// create operation logic
export const postBook = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newBook = await Book.create(body);

    res.status(201).send({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    res.send({ success: false, message: error.message, error: error });
  }
};

// single book reader operation
export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    res.send({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.send({ success: false, message: error.message, error: error });
  }
};

// update operation logic
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { body, params } = req;
    const book = await Book.findByIdAndUpdate(params!.bookId, body, {
      returnDocument: "after",
    });

    res.send({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    res.send({ success: false, message: error.message, error: error });
  }
};

// delete operation logics
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);

    res.status(204).send({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.send({ success: false, message: error.message, error: error });
  }
};
