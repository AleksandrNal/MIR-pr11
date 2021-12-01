const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, unique: true },
  date: { type: Date },
  image: { type: String },
  content: { type: String },
});

module.exports = model("News", schema);
