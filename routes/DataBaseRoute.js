const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const DataBase = require("../classes/DataBase.js");
const db = new DataBase();
router.use(json());

router.route("/new/:url").get((req, res) => {
  const url = req.params.url;
  db.shortIDtoOriginal(url)
    .then((data) => {
      res.status(302).redirect(data);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

router.route("/").post((req, res) => {
  db.addUrl(req.body.url)
    .then((data) => {
      if (data) res.status(200).send(data.shortedUrl);
      else res.status(200).send(db.URLS[db.URLS.length - 1].shortedUrl);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/statistic/:shorturlId", (req, res) => {
  const shorturl = req.params.shorturlId;
  db.statistics(shorturl)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

router.get("/lastFiveURLS", (req, res) => {
  if (db.URLS.length === 0) {
    res.status(404).send(e);
  } else {
    let str = " ";
    for (let i = 0; i < db.URLS.length; i++) {
      str += db.URLS[i].shortedUrl + ",";
    }
    res.send(str);
  }
});

module.exports = router;
