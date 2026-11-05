// controllers/movieController.js
const Movie = require("../models/Movie");
const fs = require("fs");
const path = require("path");

// Home Page Controller
// Returns a simple welcome message for the home route (GET /)
const home = (req, res) => {
  res.send("Welcome to Movie Management System");
};

// Add Movie Controller
// Supports both JSON data (req.body.poster) and Multer file upload (req.file)
const addMovie = async (req, res) => {
  try {
    const { movieName, director, category, releaseYear } = req.body;

    // If an image file was uploaded via Multer, use req.file.filename
    // Otherwise, if JSON data was sent, take the poster string from req.body.poster
    const poster = req.file ? req.file.filename : (req.body.poster || null);

    // Instantiate a new Movie document using Mongoose Model
    const movie = new Movie({
      movieName,
      director,
      category,
      releaseYear,
      poster
    });

    // Save the movie document to MongoDB
    await movie.save();

    // Return 201 Created status code with the newly created movie object
    res.status(201).json({
      success: true,
      message: "Movie Added Successfully",
      movie
    });
  } catch (error) {
    // Return 500 Internal Server Error if something fails
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message
    });
  }
};

// Get All Movies Controller
// Fetches all movie records from MongoDB using Movie.find() (GET /movies)
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      success: true,
      count: movies.length,
      movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message
    });
  }
};

// Get Single Movie Controller (by ID)
// Finds a specific movie record by its MongoDB _id using req.params.id (GET /movies/:id)
const getSingleMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found"
      });
    }
    res.status(200).json({
      success: true,
      movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message
    });
  }
};

// Edit / Update Movie Controller
// Updates text fields and optionally replaces poster image (PUT /editMovie/:id)
const editMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found"
      });
    }

    const { movieName, director, category, releaseYear } = req.body;

    // Update fields if provided, otherwise keep existing values
    movie.movieName = movieName || movie.movieName;
    movie.director = director || movie.director;
    movie.category = category || movie.category;
    movie.releaseYear = releaseYear || movie.releaseYear;

    // If a new poster image is uploaded via Multer
    if (req.file) {
      // Delete old poster from disk to prevent orphan files
      if (movie.poster) {
        const oldPath = path.join(__dirname, "..", "uploads", movie.poster);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      movie.poster = req.file.filename;
    } else if (req.body.poster) {
      // If updated via JSON raw body
      movie.poster = req.body.poster;
    }

    // Save updated movie record to MongoDB
    await movie.save();

    res.status(200).json({
      success: true,
      message: "Movie Updated Successfully",
      movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message
    });
  }
};

// Delete Movie Controller
// Deletes both the movie record from MongoDB and its poster image from disk (DELETE /deleteMovie/:id)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found"
      });
    }

    // Delete the poster image from uploads/ if it exists
    if (movie.poster) {
      const posterPath = path.join(__dirname, "..", "uploads", movie.poster);
      if (fs.existsSync(posterPath)) {
        fs.unlinkSync(posterPath);
      }
    }

    // Remove the movie document from the database
    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Movie Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message
    });
  }
};

// Delete Image Only Controller
// Deletes only the poster file from uploads/ and sets poster to null in MongoDB (DELETE /deleteImage/:id)
const deleteImage = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie Not Found"
      });
    }

    // If movie doesn't have a poster image, return 400 Bad Request
    if (!movie.poster) {
      return res.status(400).json({
        success: false,
        message: "No Poster To Delete"
      });
    }

    // Unlink the poster file safely if it exists on disk
    const posterPath = path.join(__dirname, "..", "uploads", movie.poster);
    if (fs.existsSync(posterPath)) {
      fs.unlinkSync(posterPath);
    }

    // Retain the movie record and clear the poster reference
    movie.poster = null;
    await movie.save();

    res.status(200).json({
      success: true,
      message: "Poster Deleted Successfully",
      movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message
    });
  }
};

// Export all controller functions
module.exports = {
  home,
  addMovie,
  getAllMovies,
  getSingleMovie,
  editMovie,
  deleteMovie,
  deleteImage
};
