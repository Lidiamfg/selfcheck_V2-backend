const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const subCategorySchema = new Schema({
  name: String,
});

const categorySchema = new Schema({
  name: String,
  subcategory: [subCategorySchema],
});

const Category = model("Category", categorySchema);
const Subcategory = model("Subcategory", subCategorySchema);

module.exports = Category;
module.exports = Subcategory;
