// models/Movie.js
const mongoose = require("mongoose");

// A Schema defines the blueprint/structure of documents stored in MongoDB
const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  // poster stores only the filename/path of the image in uploads folder
  // required is set to false so movies can exist without a poster, especially when deleting only the poster image
  poster: {
    type: String,
    required: false
  }
});

// A Model provides an interface to interact with the database
const Movie = mongoose.model("Movie", movieSchema);

// Export the Movie model for use in controllers
module.exports = Movie;

