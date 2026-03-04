import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";

const RandomFilms = () => {
  const [randomFilms, setRandomFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/shows/random`)
      .then((response) => response.json())
      .then((data) => {
        setRandomFilms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching random films:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading films...</p>
      </div>
    );
  }

  return (
    <section className="mb-4" style={{ width: "95%", margin: "auto" }}>
      <h2 className="text-center my-4 mb-4">Rentals to view</h2>
      <Row className="g-4">
        {randomFilms.map((film) => (
          <Col key={film._id} sm={12} md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={film.image_link || "https://via.placeholder.com/300x200"}
                alt={film.title}
                height={250}
              />
              <Card.Body style={{ backgroundColor: "#fff5e2" }}>
                <Card.Title>{film.title}</Card.Title>
                <Card.Text>
                  <strong>Type:</strong> {film.type}
                </Card.Text>
                <Button variant="dark" href={`/prod/${film._id}`}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default RandomFilms;
