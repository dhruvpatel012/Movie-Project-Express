// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const upload = require("../middleware/upload");

// Home Route
router.get("/", movieController.home);

// Add Movie Route
router.post("/addMovie", upload.single("poster"), movieController.addMovie);

// Get All Movies Route
router.get("/movies", movieController.getAllMovies);

// Get Single Movie Route (by ID)
router.get("/movies/:id", movieController.getSingleMovie);

// Edit Movie Route (PUT /editMovie/:id with optional poster replacement)
router.put("/editMovie/:id", upload.single("poster"), movieController.editMovie);

// Delete Movie Route (DELETE /deleteMovie/:id)
router.delete("/deleteMovie/:id", movieController.deleteMovie);

// Delete Image Only Route (DELETE /deleteImage/:id)
router.delete("/deleteImage/:id", movieController.deleteImage);

module.exports = router;
