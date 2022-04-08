const Movies = require("../models/Movies");

exports.postMovie = (req, res, next) => {
  const movie = new Movies(req.body);
  let error = movie.validateSync();
  if (error) {
    return res.status(403).send(error.message);
  }
  movie.saveMovie(movie);
};

exports.getMovies = (req, res, next) => {
  Movies.fetchAll((movies) => {
    res.send(movies);
  });
};
