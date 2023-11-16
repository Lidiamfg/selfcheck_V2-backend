const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const incomeSchema = new Schema({
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

const Income = model("Income", incomeSchema);

module.exports = Income;
