const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const DataBase = require("../classes/DataBase.js");
const db = new DataBase();

router.route("/").get((req, res) => {
  db.getData()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(503).send(e);
    });
});

router.route("/:url").post((req, res) => {
  db.addUrl(req.params.url)
    .then((data) => {
      if (data) res.send(data);
      else res.send(db.URLS[db.URLS.length - 1]);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
module.exports = router;
