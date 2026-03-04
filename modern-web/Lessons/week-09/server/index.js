require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const Book = require("./models/book");

// adding our mongoDB database
const mongoose = require("mongoose"); // importing the dependancy
mongoose.connect(process.env.MONGODB_BOOKSTORE); // establishing a connection -> connect command + an api string to connect to our database
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

app.get("/fetch_filter", (req, res) => {
  Book.find(
    { title: "The Silent Patient" },
    { date_created: 0, pages: 0, price: 0 }
  )
    .then((books) => {
      res.json(books); // Return the fetched books as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

app.get("/fetch/:objectID", (req, res) => {
  Book.findById(req.params.objectID)
    .then((books) => {
      res.json(books); // Return the fetched books as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

app.post("/search", (req, res) => {
  // check what they sent me
  // based on whats checked, add those into a query
  const filter = {};
  if (req.body.pages) {
    if (req.body.arth == "gte") {
      filter.pages = { $gte: parseInt(req.body.pages) };
    }
    if (req.body.arth == "gt") {
      filter.pages = { $gt: parseInt(req.body.pages) };
    }
    if (req.body.arth == "lte") {
      filter.pages = { $lte: parseInt(req.body.pages) };
    }
    if (req.body.arth == "lt") {
      filter.pages = { $lt: parseInt(req.body.pages) };
    }
  }

  if (req.body.author) {
    filter.author = req.body.author;
  }

  console.log(filter);

  Book.find(filter)
    .then((books) => {
      res.json(books); // Return the fetched books as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

app.post("/save-book", async (req, res) => {
  const { title, author, pages, genres } = req.body;
  console.log(req.body);

  // Create a new book instance
  const newBook = new Book({
    title,
    author,
    pages,
    genres,
  });

  newBook
    .save()
    .then((savedBook) => {
      res.status(201).json(savedBook);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete("/delete-book", (req, res) => {
  const bookId = req.body._id;

  Book.deleteOne({ _id: bookId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Book not found" });
      }
      res.status(200).send({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err); // Handle any errors
    });
});

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
