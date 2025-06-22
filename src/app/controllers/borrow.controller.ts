import { Request, Response } from "express";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";

// logics to get the details of borrowed books
export const getBorrowBooksDetails = async (req: Request, res: Response) => {
  try {
    const borrows = await Borrow.aggregate([
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
    
  } catch (error: any) {
    res.send({ success: false, message: error.message, error: error });
  }
};

// logics to borrow books
export const postBorrowBook = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const result = await Book.findOneAndUpdate(
      { _id: book, copies: { $gte: quantity } },
      { $inc: { copies: -quantity } },
      { returnDocument: "after" }
    );

    if (!result) {
      res.send({
        success: false,
        message: "Not found or Not enough in stock",
        error:
          "The book-id is either not found in book collection or it has not enough number of quantity in stock",
      });
      return;
    }

    const postBorrow = await Borrow.create({ book, quantity, dueDate });

    res.send({
      success: true,
      message: "Book borrowed successfully",
      data: postBorrow,
    });
  } catch (error: any) {
    res.send({ success: false, message: error.message, error: error });
  }
};
