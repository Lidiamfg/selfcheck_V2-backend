const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const budgetSchema = new Schema({
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
  },
  month: String,
  amount: Number,
  description: String,
});

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
