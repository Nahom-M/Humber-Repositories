import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const Experience = () => {
  //const [experience, setExperience] = useState([]);

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

  return (
    <div>
      <div className="content">
        <h2>Experience</h2>
        {experience.length > 0 && (
          <Card style={{ width: "80%" }}>
            <Card.Body>
              <Card.Title style={{ color: "white" }}>
                <h3>{experience[0].position}</h3>
              </Card.Title>{" "}
              <Card.Title className="mb-2" style={{ color: "white" }}>
                {experience[0].company}
              </Card.Title>
              <Card.Text>Duration: {experience[0].duration}</Card.Text>
              <Button
                className="btn btn-primary"
                style={{ width: "50%" }}
                onClick={() => revealDescription("box1Description")}
              >
                Description
              </Button>
              <p id="box1Description">{experience[0].description}</p>
            </Card.Body>
          </Card>
        )}
      </div>

      <div className="content">
        {experience.length > 0 && (
          <Card style={{ width: "80%" }}>
            <Card.Body>
              <Card.Title style={{ color: "white" }}>
                <h3>{experience[1].position}</h3>
              </Card.Title>{" "}
              <Card.Title className="mb-2" style={{ color: "white" }}>
                {experience[1].company}
              </Card.Title>
              <Card.Text>Duration: {experience[1].duration}</Card.Text>
              <Button
                className="btn btn-primary"
                style={{ width: "50%" }}
                onClick={() => revealDescription("box2Description")}
              >
                Description
              </Button>
              <p id="box2Description">{experience[1].description}</p>
            </Card.Body>
          </Card>
        )}
      </div>

      <div className="content">
        {experience.length > 0 && (
          <Card style={{ width: "80%" }}>
            <Card.Body>
              <Card.Title style={{ color: "white" }}>
                <h3>{experience[2].position}</h3>
              </Card.Title>{" "}
              <Card.Title className="mb-2" style={{ color: "white" }}>
                {experience[2].company}
              </Card.Title>
              <Card.Text>Duration: {experience[2].duration}</Card.Text>
              <Button
                className="btn btn-primary"
                style={{ width: "50%" }}
                onClick={() => revealDescription("box3Description")}
              >
                Description
              </Button>
              <p id="box3Description">{experience[2].description}</p>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Experience;
