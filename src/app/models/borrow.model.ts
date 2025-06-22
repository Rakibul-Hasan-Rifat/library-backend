import { Schema, model } from "mongoose";
import IBorrow from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.ObjectId, required: true, ref: "Book" },
  quantity: { type: Number, required: [true, "Quantity is a required field."], min: [1, 'Quantity should be greater than 0.'] },
  dueDate: { type: Date, required: [true, "Due-Date is required to mention."] },
}, {
  versionKey:false, 
  timestamps: true
});

const Borrow = model("Borrow", borrowSchema);

export default Borrow;
