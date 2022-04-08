const Movies = require("../models/Movies");

exports.postMovie = (req, res, next) => {
  const movie = new Movies(req.body);
  movie.saveMovie(movie);
};

exports.getMovies = (req, res, next) => {
  Movies.fetchAll((movies) => {
    res.send(movies);
  });
};
