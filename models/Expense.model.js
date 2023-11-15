const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const expenseSchema = new Schema({
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
  },
  month: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  date: { type: Date, default: Date.now },
  amount: Number,
  description: String,
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
