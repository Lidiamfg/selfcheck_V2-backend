const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const subCategorySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  name: String,
});

const Subcategory = model("Subcategory", subCategorySchema);

module.exports = Subcategory;
