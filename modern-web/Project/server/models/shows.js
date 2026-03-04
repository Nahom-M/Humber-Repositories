const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  genre: {
    type: Array,
    required: false,
  },
  director: {
    type: String,
    required: false,
  },
  numberOfSeasons: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  dateReleased: {
    type: Date,
    required: false,
  },
  dateEnded: {
    type: Date,
    required: false,
  },
  image_link: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  rentalTime: {
    type: String,
    required: false,
  },
  trailer: {
    type: String,
    required: false,
  },

  //collection: "{collection name here}"
});

// Create the model
const Show = mongoose.model("shows", showSchema);
module.exports = Show;
