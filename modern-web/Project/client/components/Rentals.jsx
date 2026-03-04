import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchRentals = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch rental data");
        }

        const data = await response.json();
        setRentals(data.current_rental || []); // Assuming the current_rental is available
      } catch (error) {
        console.error("Error fetching rental data:", error);
      }
    };

    fetchRentals();
  }, []);

  const totalPages = Math.ceil(rentals.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentRentals = rentals.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleToProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <div className="rentalsContainer" style={{ width: "90%", margin: "auto" }}>
      <h1>Rentals</h1>
      {currentRentals.length > 0 ? (
        currentRentals.map((rental, index) => (
          <Card
            key={index}
            className="mt-2"
            style={{ backgroundColor: "#fffaf1" }}
          >
            <Card.Body>
              <Card.Title>{rental.title}</Card.Title>
              <Card.Text>
                <strong>Type:</strong> {rental.type}
              </Card.Text>
              <Card.Text>
                <strong>Rental Date:</strong> {rental.rentalTime}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${rental.price}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="mt-2">
          <Card.Body>No rentals found.</Card.Body>
        </Card>
      )}

      {rentals.length > itemsPerPage && (
        <div className="paginationButtons mt-3 mb-3">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </Button>
          <Button variant="primary" onClick={handleToProfile}>
            To Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default Rentals;
