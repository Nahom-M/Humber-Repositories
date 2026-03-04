import { useEffect, useState } from "react";
import "./App.css";

const Overview = () => {
  //const [overview, setOverview] = useState([]);

  const overview = [
    {
      summary:
        "I am a dedicated and enthusiastic software developer with a strong passion for web development, full-stack technologies, and problem-solving. Over the course of my studies, I have developed a wide range of skills, from front-end design using HTML, CSS, and React, to back-end development with Node.js and Java. I have worked on multiple projects, including creating dynamic websites, building interactive web applications, and managing databases.",
      otherSkills:
        "Additionally I have been interested in other side projects such as using Godot to code some games and practice my coding knowledge. My skills also extend to using Python, PHPmyAdmin, MySQL, and Javascript to develop a variety of applications.",
    },
  ];

  return (
    <div className="content" style={{ margin: "30px 10%", width: "80%" }}>
      <div>
        <h2>Background</h2>
        {overview.length > 0 && <div>{overview[0].summary}</div>}
      </div>
      <br></br>
      <div>{overview.length > 0 && <div>{overview[0].otherSkills}</div>}</div>
    </div>
  );
};

export default Overview;
