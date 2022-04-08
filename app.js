const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const moviesRoutes = require("./routes/Movies");

app.use(moviesRoutes);

app.listen(3000);
