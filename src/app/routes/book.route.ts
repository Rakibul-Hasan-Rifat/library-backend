import { Router } from "express";
import {
  getBooks,
  getSingleBook,
  postBook,
  updateBook,
} from "../controllers/book.controller";

const bookRoute = Router();

bookRoute.route("/").get(getBooks).post(postBook);
bookRoute.route("/:bookId").get(getSingleBook).put(updateBook);

export default bookRoute;
