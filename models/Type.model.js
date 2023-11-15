const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const typeSchema = new Schema({
  name: String,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Type = model("Type", typeSchema);

module.exports = Type;
