import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getEdu")
      .then((response) => response.json())
      .then((data) => setEducation(data))
      .catch((error) => console.error("Error fetching education", error));
  }, []);

  return (
    <div className="content">
      <Container className="education-container my-5 mx-auto">
        {education.length > 0 && (
          <div>
            <Row className="justify-content-center mb-4">
              <h2>Education</h2>
            </Row>
            <Row className="gridItems py-2">
              <Col className="g-3 font-weight-bold">Degree:</Col>
              <Col className="g-3">{education[0].degree}</Col>
            </Row>
            <Row className="gridItems py-2">
              <Col className="g-3 font-weight-bold">School:</Col>
              <Col className="g-3">{education[0].school}</Col>
            </Row>
            <Row className="gridItems py-2">
              <Col className="g-3 font-weight-bold">Duration:</Col>
              <Col className="g-3">{education[0].duration}</Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Education;
