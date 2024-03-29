const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  title: String,
  image: String,
  finalBudget: Number,
  finalDepartDate: Date,
  finalReturnDate: Date,
  finalActivities: [String],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Group", GroupSchema);
