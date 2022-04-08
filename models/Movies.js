const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const dirPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "db.json"
);

const MovieSchema = new mongoose.Schema({
  genres: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxLength: [255, "Too long, 255 characters only."],
  },
  year: {
    type: Number,
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
    maxLength: [255, "Too long, 255 characters only."],
  },
  actors: {
    type: String,
    required: false,
  },
  plot: {
    type: String,
    required: false,
  },
  posterUrl: {
    type: String,
    required: false,
  },
});

MovieSchema.methods.getMoviesFromFile = function getMoviesFromFile(callback) {
  fs.readFile(dirPath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

MovieSchema.methods.saveMovie = function saveMovie() {
  MovieSchema.methods.getMoviesFromFile((Movies) => {
    Movies.g;
    Movies.movies.push(this);
    fs.writeFile(dirPath, JSON.stringify(Movies), (err) => {
      console.log(err);
    });
  });
};

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
