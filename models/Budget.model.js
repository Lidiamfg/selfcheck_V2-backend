const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const budgetSchema = new Schema({
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
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
  amount: Number,
  description: String,
});

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
