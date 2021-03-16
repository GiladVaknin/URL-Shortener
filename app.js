require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortUrl = require("./routes/DataBaseRoute");
const DataBase = require("../URL-Shortener/classes/DataBase");
const { resolve } = require("path");
const db = new DataBase();

app.use(cors());
app.use("/shortURL", shortUrl);
app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

module.exports = app;
