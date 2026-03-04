const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

//Here in the GET the server will read "Hello" and display it to the client
app.get("/view", (req, res) => {
  res.send("Hello");
});

//When the user submits the form they will the POST will send the info to the server
app.post("/register", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.send("Info Received");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
