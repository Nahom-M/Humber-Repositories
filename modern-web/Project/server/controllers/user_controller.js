// controllers/userController.js
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { generateToken } = require("../middlewares/auth");

// Register user
const registerUser = async (req, res) => {
  try {
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

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      current_cart,
      current_rental,
      order_history,
    });

    await newUser.save();
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const tokenObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      current_cart: user.current_cart,
      current_rental: user.current_rental,
      order_history: user.order_history,
    };
    const token = generateToken(tokenObj);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// Logout user (clear the token in the front-end, if needed)
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

// Check session (verify token in header or cookie)
const checkSession = (req, res) => {
  if (req.user) {
    res.status(200).json({ userId: req.user.userId, name: req.user.name });
  } else {
    res.status(401).json({ message: "No user session found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkSession,
};
