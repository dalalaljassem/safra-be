const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`You are connected:${conn.connection.host}`);
};

module.exports = connectDB;
