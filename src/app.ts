import express, { Application, NextFunction, Request, Response, response } from "express";
import bookRoute from "./app/routes/book.route";
import borrowBookRoute from "./app/routes/borrow.route";

const app: Application = express();

app.use(express.json());

app.use("/api/books", bookRoute);
app.use("/api/borrow", borrowBookRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("The app is running online!!");
});

app.use((req: Request,res: Response,next: NextFunction) => {
  res.status(404).json({message: "Route not found"})
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).send({message: "Something went wrong from global error", error})
  }
})

export default app;
