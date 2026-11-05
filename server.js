// server.js - Entry point for Movie Management System application
const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env into process.env
dotenv.config();

// Import database connection configuration
const connectDB = require("./config/db");

// Import movie routes
const movieRoutes = require("./routes/movieRoutes");

// Initialize Express application
const app = express();

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// Static folder (poster images can be viewed directly in the browser)
app.use("/uploads", express.static("uploads"));

// Database Connection
connectDB();

// Register application routes
app.use("/", movieRoutes);

// Server listener
app.listen(process.env.PORT, () => {
  console.log("Server Running on Port " + process.env.PORT);
});
