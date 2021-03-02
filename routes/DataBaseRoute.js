const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("get method data base!");
  })
  .post((req, res) => {});

router.route("/:url").get((req, res) => {
  const url = req.params.url;
  res.send(url);
});
module.exports = router;
