const express = require("express");

const moviesController = require("../controllers/MoviesController");

const router = express.Router();

router.get("/:duration?/:genres?", moviesController.getMovies);

router.post("/api/v1/add_movie", moviesController.postMovie);

module.exports = router;
