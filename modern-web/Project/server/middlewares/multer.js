const multer = require("multer");

const storage = multer.memoryStorage(); // RAM storage
const upload = multer({ storage: storage });

module.exports = upload;
