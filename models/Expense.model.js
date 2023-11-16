const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const expenseSchema = new Schema({
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  month: String,
  date: { type: Date, default: Date.now },
  amount: Number,
  description: String,
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
