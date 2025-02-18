const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a base de dados");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
