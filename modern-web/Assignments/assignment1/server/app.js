const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["nahom-portfolio-hhfd17rs6-nahoms-projects-c8c38e6f.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

/*
mongoose.connect(
  "mongodb+srv://nahommese:aPrciHkZl9mSlIJD@cluster0.vwoj6.mongodb.net/nahommese?retryWrites=true&w=majority&appName=Cluster0"
);
*/

const education = [
  {
    degree: "Diploma in Computer Programming",
    school: "Humber Polytechnic",
    duration: "September 2023 - Present",
  },
];
const experience = [
  {
    position: "Web Developer",
    company: "Ethiopian Association",
    duration: "May 2024 - August 2024",
    description:
      "Hired as a web developer, responsible for designing and building a new website for the Toronto region of this organization. This role also included creating a database for the new website, utilizing PhpMyAdmin to ensure data management. Occasionally assisted with visitor inquiries and answering phone calls when other staff members were unavailable.",
  },
  {
    position: "Maintainer",
    company: "CaringForRefugees",
    duration: "December 2023 - Present",
    description:
      "Maintained the Caring For Refugees website by regularly updating plugins and and backing up the site to GitHub. Additionally, recorded all changes in an Excel spreadsheet.",
  },
  {
    position: "Student Projects",
    company: "Humber Polytechnic",
    duration: "September 2023 - Present",
    description:
      "Possesses hands-on experience in developing a variety of projects across many different programming languages, including a Java-based game, a React website, and a small-scale database system. Some of which can be found on my GitHub located in the footer.",
  },
];
const overview = [
  {
    summary:
      "I am a dedicated and enthusiastic software developer with a strong passion for web development, full-stack technologies, and problem-solving. Over the course of my studies, I have developed a wide range of skills, from front-end design using HTML, CSS, and React, to back-end development with Node.js and Java. I have worked on multiple projects, including creating dynamic websites, building interactive web applications, and managing databases.",
    otherSkills:
      "Additionally I have been interested in other side projects such as using Godot to code some games and practice my coding knowledge. My skills also extend to using Python, PHPmyAdmin, MySQL, and Javascript to develop a variety of applications.",
  },
];

app.get("/", (req, res) => {
  res.send("Hello to base server");
});

app.get("/getEdu", (req, res) => {
  res.json(education);
});

app.get("/getExp", (req, res) => {
  res.json(experience);
});

app.get("/getOverview", (req, res) => {
  res.json(overview);
});

app.get("/downloadResume", (req, res) => {
  const file = path.join(__dirname, "uploads", "Resume.pdf");
  res.download(file);
});

app.use("", (req, res) => {
  res.send("PAGE NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
