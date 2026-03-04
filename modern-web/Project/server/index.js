require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const fetch_router = require("./routers/fetch_router");
const users_router = require("./routers/users");
const shows_router = require("./routers/shows");

// adding our mongoDB database
const mongoose = require("mongoose"); // importing the dependancy
mongoose.connect(process.env.MONGODB_CART); // establishing a connection -> connect command + an api string to connect to our database
// this does not keep the connection, only establishes where it will go to connect
const db = mongoose.connection; // saving the databse usecase into a variable

db.once("open", () => {
  // Check connection
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  // Check for DB errors
  console.log("DB Error");
});

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/fetch", fetch_router);
app.use("/users", users_router);
app.use("/shows", shows_router);

app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
