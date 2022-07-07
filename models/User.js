const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  budget: { type: Number, default: 0 },
  image: { type: String, default: null },
  activities: [String],
  departDate: { type: Date, default: null },
  returnDate: { type: Date, default: null },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
