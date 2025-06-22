import express, { Application, Request, Response } from "express";
import bookRoute from "./app/routes/book.route";
import borrowBookRoute from "./app/routes/borrow.route";
// import bookRoute from "./app/routes/books.route";

const app: Application = express();

app.use(express.json());

app.use("/api/books", bookRoute);
app.use("/api/borrow", borrowBookRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("The app is running online!!");
});

export default app;
