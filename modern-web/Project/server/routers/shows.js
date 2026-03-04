const express = require("express");
const shows_router = express.Router();
const fs = require("fs");
const path = require("path");

const upload = require("../middlewares/multer");
const Show = require("../models/shows");

//Fetch All
shows_router.get("/list", (req, res) => {
  Show.find()
    .then((show) => {
      res.json(show);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Fetch One
shows_router.get("/fetch/:objectID", (req, res) => {
  Show.findById(req.params.objectID)
    .then((show) => {
      res.json(show);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Add user
shows_router.post("/add", upload.single("file"), async (req, res) => {
  const file = req.file;

  const {
    title,
    type,
    genre,
    director,
    numberOfSeasons,
    description,
    dateReleased,
    dateEnded,
    price,
    image_link,
    rentalTime,
  } = req.body;
  console.log(req.body);

  // Create a new book instance
  const newShow = new Show({
    title,
    type,
    genre,
    director,
    numberOfSeasons,
    description,
    dateReleased,
    dateEnded,
    price,
    image_link,
    rentalTime,
    image: req.file.buffer,
  });

  newShow
    .save()
    .then((savedShow) => {
      res.status(201).json(savedShow);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

shows_router.delete("/delete", (req, res) => {
  const showId = req.body._id;

  Show.deleteOne({ _id: showId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Show not found" });
      }
      res.status(200).send({ message: "Show deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Fetch Random Films
shows_router.get("/random", (req, res) => {
  Show.aggregate([{ $sample: { size: 3 } }]) // Randomly fetch 3 films
    .then((shows) => {
      res.json(shows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = shows_router;
