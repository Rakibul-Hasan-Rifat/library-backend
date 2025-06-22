import { Router } from "express";
import {
  getBorrowBooksDetails,
  postBorrowBook,
} from "../controllers/borrow.controller";

const borrowBookRoute = Router();

borrowBookRoute.route("/").get(getBorrowBooksDetails).post(postBorrowBook);

export default borrowBookRoute;
