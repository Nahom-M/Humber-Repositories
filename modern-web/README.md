Student Name: Mesele, Nahom
Student Number: N01522132

/_
Get - Read
Post - Insert
Put/Patch - Update data/insert new id
Delete - Delete
_/

SERVER
new file .gitignore (node_modules)
npm init -y (node modules & json packages)
npm install nodemon
npm install lodash
npm install express
npm install --save multer
npm install cors
npm install mongoose
npm install dotenv
npm install --save express-validator (Not used usually)
npm install bcrypt
npm install express-session
npm install connect-mongo
npm install jsonwebtoken

.env
PORT = 5000
MONGODB_CART = mongodb+srv://nahommese:temppass@cluster0.vwoj6.mongodb.net/cart
VITE_SERVER_URL=http://localhost:5000/
JWT_SECRET=ewiur4729yeydsfsd

CLIENT
npm create vite@latest .
npm install
npm install react-router-dom
npm install bootstrap@5.3.3
npm install react-bootstrap bootstrap (Vite - This one works)
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons

Project - API
https://developer.themoviedb.org/reference/trending-movies

Vercel - Deployment
Add vercel.json file
Upload to GitHub
On vercel import project and deploy client and server, for server make sure to add environmental variables

Next.js
_May need to downgrade to follow tutorial completely:_
_npm install react@18.2.0 react-dom@18.2.0 (Downgrade command, need to run npm i again)_
npx create-next-app@latest
npx shadcn-ui@latest init (This is outdated)
npx shadcn@latest init

Next.js Extra Tools
npm install lucide-react
npx shadcn@latest add button
npm install framer-motion (Animations)

Clerk
npm install @clerk/nextjs
npm install @clerk/nextjs@latest

Aceternity
npm i framer-motion clsx tailwind-merge

Drizzle
npm i drizzle-orm pg
npm i -D drizzle-kit @types/pg
npm run db:push

Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Kinde
npm i @kinde-oss/kinde-auth-nextjs (May need to downgrade)

Fonts
npm i @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

Mongo
npm i mongodb mongoose

const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageBuffer: {
    type: Buffer,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Image", ImageSchema);

const multer = require("multer");
const storage = multer.memoryStorage(); //RAM
const upload = multer({ storage: storage });
 
app.post(upload.array("files", 100), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  const imagePromises = req.files.map((file) => {
    const newImage = new Image({
      filename: file.originalname,
      contentType: file.mimetype,
      imageBuffer: file.buffer,
    });
    return newImage.save();
  });
  Promise.all(imagePromises)
    .then(() => {
      res.status(200).send("Files uploaded successfully.");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error saving files to database.");
    });
});
 
 