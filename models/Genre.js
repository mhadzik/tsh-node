const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Comedy",
      "Fantasy",
      "Crime",
      "Drama",
      "Music",
      "Adventure",
      "History",
      "Thriller",
      "Animation",
      "Family",
      "Mystery",
      "Biography",
      "Action",
      "Film-Noir",
      "Romance",
      "Sci-Fi",
      "War",
      "Western",
      "Horror",
      "Musical",
      "Sport",
    ],
  },
});

const Genre = mongoose.model("Genre", GenreSchema);
module.exports = Genre;
