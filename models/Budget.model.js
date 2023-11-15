const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const budgetSchema = new Schema({
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
  },
  month: String,
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
    },
  ],
  amount: Number,
  description: String,
});

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
