const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const categorySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  typeIE: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
  name: String,
});

const Category = model("Category", categorySchema);

module.exports = Category;
