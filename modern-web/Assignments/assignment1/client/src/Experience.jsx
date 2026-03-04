import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const Experience = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getExp")
      .then((response) => response.json())
      .then((data) => setExperience(data))
      .catch((error) => console.error("Error fetching experience", error));
  }, []);

  const revealDescription = (getId) => {
    let element = document.getElementById(getId);
    if (element.style.display === "none" || element.style.display === "") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

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
              <Card.Title className="mb-2" style={{ color: "white"}}>
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
