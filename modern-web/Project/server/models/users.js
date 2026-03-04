const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  current_cart: {
    type: Array,
    required: true,
  },
  current_rental: {
    type: Array,
    required: true,
  },
  order_history: {
    type: Array,
    required: true,
  },
  //collection: "{collection name here}"
});

// Create the model
const User = mongoose.model("users", userSchema);
module.exports = User;
