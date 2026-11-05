// config/db.js
const mongoose = require("mongoose");

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Connect to database using URI stored in environment variables (.env)
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    // Catch and log any connection errors
    console.log(error);
  }
};

// Export the connectDB function so it can be called in server.js
module.exports = connectDB;
