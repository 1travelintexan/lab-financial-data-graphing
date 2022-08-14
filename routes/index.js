const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/", async (req, res, next) => {
  // const months = Object.keys(bitcoinData.data.bpi).map(
  //   (elem) => elem.split("-")[2]
  // );
  // const prices = Object.values(bitcoinData.data.bpi).map((elem) =>
  //   Math.round(Number(elem))
  // );
  // let test = "test string";

  res.render("index");
});

module.exports = router;
