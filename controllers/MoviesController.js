const Movies = require("../models/Movies");
const fs = require("fs");
const path = require("path");

const dirPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "db.json"
);

const rawdata = fs.readFileSync(dirPath);
const data = JSON.parse(rawdata);

exports.postMovie = (req, res) => {
  const movie = new Movies(req.body);
  let error = movie.validateSync();
  if (error) {
    return res.status(403).send(error.message);
  }
  movie.saveMovie(movie);
  res.status(200).send("Movie added to db.json");
};

exports.getMovies = (req, res) => {
  const duration = req.query.duration;
  const genres = req.query.genres;

  if (duration && !genres) {
    const data = getMoviesByDuration(duration);
    return res.send(data);
  }

  if (genres && !duration) {
    const data = getMoviesByGenres(genres);
    return res.send(data);
  }

  if (duration && genres) {
    const data = getMoviesByGenresAndDuration(duration, genres);
    return res.send(data);
  }

  return res.send(getRandomMovie());
};

getMoviesByDuration = (duration) => {
  const filteredMovies = [];
  data.movies.map((movie) => {
    if (movie.runtime >= duration - 10 && movie.runtime <= duration + 10) {
      filteredMovies.push(movie);
    }
  });
  return filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
};

getMoviesByGenres = (genres) => {
  const filteredMovies = [];
  data.movies.map((movie) => {
    let result = movie.genres.some((r) => genres.includes(r));
    if (result) {
      filteredMovies.push(movie);
    }
  });

  return filteredMovies;
};

getMoviesByGenresAndDuration = (duration, genres) => {
  const moviesByGenres = getMoviesByGenres(genres);
  const filteredMovies = [];
  moviesByGenres.map((movie) => {
    if (movie.runtime >= duration - 10 && movie.runtime <= duration + 10) {
      filteredMovies.push(movie);
    }
  });
  return filteredMovies;
};

getRandomMovie = () => {
  return data.movies[Math.floor(Math.random() * data.movies.length)];
};
