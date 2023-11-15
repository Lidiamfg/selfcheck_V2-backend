const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const yearSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  number: { type: Number, minimum: 2000, maximum: 3000 },
  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
    },
  ],
  expense: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  budget: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
    },
  ],
});

const Year = model("Year", yearSchema);

module.exports = Year;
