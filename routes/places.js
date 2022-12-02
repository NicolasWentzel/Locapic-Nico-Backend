var express = require("express");
var router = express.Router();
require("../models/connection");
const Place = require("../models/places");

router.post("/places", (req, res) => {
  const newPlace = new Place({
    nickname: req.body.nickname,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  newPlace.save().then(() => {
    Place.find().then((place) => {
      res.json({
        result: true,
        message: "New marker created",
        place,
      });
    });
  });
});

router.get("/places/:nickname", (req, res) => {
  Place.find({ nickname: req.params.nickname }).then((data) => {
    if (data === null) {
      res.json({ result: false, error: "nickname not found" });
      return;
    }
    console.log(data);
    res.json({
      result: true,
      places: data,
    });
  });
});

router.delete("/places", (req, res) => {
  Place.deleteOne({ nickname: req.body.nickname, name: req.body.name }).then(
    (data) => {
      res.json({
        result: true,
        places: data,
      });
    }
  );
});

module.exports = router;
