const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const incomeSchema = new Schema({
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

const Income = model("Income", incomeSchema);

module.exports = Income;
