const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const typeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  nominalAccount: { type: String, enum: ["Income", "Expense"] },
});

const Type = model("Type", typeSchema);

module.exports = Type;
