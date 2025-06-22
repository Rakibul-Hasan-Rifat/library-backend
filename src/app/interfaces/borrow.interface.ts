import { Schema } from "mongoose";

interface IBorrow {
    book: Schema.Types.ObjectId,
    quantity: number,
    dueDate: Date
}


export default IBorrow;