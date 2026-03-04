const express = require("express");
const users_router = express.Router();
const fs = require("fs");
const path = require("path");

const userController = require("../controllers/user_controller"); // Import the userController
const User = require("../models/users");
const { verifyToken } = require("../middlewares/auth");

//Fetch All
users_router.get("/list", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Fetch One
users_router.get("/fetch/:objectID", verifyToken, (req, res) => {
  User.findById(req.params.objectID)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Add user
users_router.post("/add", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  console.log(req.body);

  // Create a new book instance
  const newUser = new User({
    name,
    email,
    password,
    phone,
    address,
    current_cart,
    current_rental,
    order_history,
  });

  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//Put
users_router.put("/update/:id", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    current_cart,
    current_rental,
    order_history,
  } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    //Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.current_cart = current_cart || user.current_cart;
    user.current_rental = current_rental || user.current_rental;
    user.order_history = order_history || user.order_history;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

users_router.delete("/delete", (req, res) => {
  const userId = req.body._id;

  User.deleteOne({ _id: userId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ message: "User deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Fetch the logged-in user's information
users_router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user information" });
  }
});

users_router.put("/update_cart", verifyToken, async (req, res) => {
  const { current_cart } = req.body; // The updated cart array
  const userId = req.user.userId; // Get the user's ID from the authentication token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemId = current_cart[0].id; // Assume only one item is being sent

    // Check if the item is already in the current_cart array
    const isItemInCart = user.current_cart.some((item) => item.id === itemId);

    // Check if the item is already in the current_rental array
    const isItemInRental = user.current_rental.some(
      (item) => item.id === itemId
    );

    if (isItemInCart) {
      return res.status(400).json({
        success: false,
        error: "This item is already in your cart.",
      });
    }

    if (isItemInRental) {
      return res.status(400).json({
        success: false,
        error: "This item is already rented.",
      });
    }

    // Append the item to the cart if it passes all checks
    user.current_cart.push(...current_cart);

    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, error: "Failed to update cart." });
  }
});

users_router.delete("/remove_cart/:id", verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const movieId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the movie with the given ID from the current_cart
    user.current_cart = user.current_cart.filter(
      (movie) => movie.id !== movieId
    );

    // Save the updated user document
    await user.save();
    res.json({ success: true, current_cart: user.current_cart }); // Return the updated cart
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
});

// POST /checkout
// POST /checkout
users_router.put("/checkout", verifyToken, async (req, res) => {
  const userId = req.user.userId; // Get the user's ID from the authentication token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an order history entry
    const newOrder = {
      id: new Date().getTime(), // Use a timestamp for a unique ID
      date: new Date().toISOString(),
      itemsPurchased: user.current_cart.length,
      totalCost: user.current_cart.reduce(
        (sum, movie) => sum + Number(movie.price),
        0
      ),
      titles: user.current_cart.map((movie) => movie.title),
    };

    // Add the new order to orderHistory
    user.order_history.push(newOrder);

    // Move all items from current_cart to current_rental
    user.current_rental.push(...user.current_cart);

    // Clear the cart
    user.current_cart = [];

    await user.save();

    res.json({
      success: true,
      message: "Checkout successful. Items moved to rentals.",
      current_rental: user.current_rental,
      order_history: user.order_history,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to complete checkout." });
  }
});

// Register route
users_router.post("/register", userController.registerUser);

// Login route
users_router.post("/login", userController.loginUser);

// Logout route
users_router.get("/logout", userController.logoutUser);

// Express route for checking the session
users_router.get("/session", userController.checkSession);

module.exports = users_router;
