const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const DataBase = require("../classes/DataBase.js");
const db = new DataBase();
router.use(json());

router.route("/:url").get((req, res) => {
  const url = req.params.url;

  db.shortIDtoOriginal(url)
    .then((data) => {
      //   console.log(data);
      res.status(302).redirect(data);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

router.route("/").post((req, res) => {
  db.addUrl(req.body.url)
    .then((data) => {
      if (data) res.send(data.shortedUrl);
      else res.send(db.URLS[db.URLS.length - 1].shortedUrl);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
module.exports = router;
