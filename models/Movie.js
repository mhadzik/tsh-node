const fs = require("fs");
const path = require("path");

const dirPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "db.json"
);

const getMoviesFromFile = (callback) => {
  fs.readFile(dirPath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Movie {
  constructor(title, genres, year, runtime, director, actors, plot, posterUrl) {
    this.title = title;
    this.genres = genres;
    this.year = year;
    this.runtime = runtime;
    this.director = director;
    this.actors = actors || null;
    this.plot = plot || null;
    this.posterUrl = posterUrl || null;
  }

  save() {
    getMoviesFromFile((Movies) => {
      Movies.push(this);
      fs.writeFile(dirPath, JSON.stringify(Movies), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getMoviesFromFile(callback);
  }
};
