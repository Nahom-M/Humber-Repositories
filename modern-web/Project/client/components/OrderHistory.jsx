import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Maximum 3 orders per page
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchHistory = async () => {
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
          throw new Error("Failed to fetch order history data");
        }

        const data = await response.json();
        setHistory(data.order_history || []); // Assuming the order_history is available
      } catch (error) {
        console.error("Error fetching order history data:", error);
      }
    };

    fetchHistory();
  }, []);

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentOrders = history.slice(startIndex, startIndex + itemsPerPage);

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
      <h1>Order History</h1>

      {currentOrders.length > 0 ? (
        currentOrders.map((hist, index) => (
          <Card
            key={index}
            className="mt-2"
            style={{ backgroundColor: "#fffaf1" }}
          >
            <Card.Body>
              <Card.Title>Order #{hist.id}</Card.Title>
              <Card.Text>
                <strong>Rental Date:</strong> {hist.date.split("T")[0]}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${hist.totalCost}
              </Card.Text>
              <div>
                <strong>Items Purchased:</strong>
                <ul>
                  {hist.titles.map((title, index) => (
                    <li key={index}>{title}</li>
                  ))}
                </ul>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="mt-2">
          <Card.Body>No order history found.</Card.Body>
        </Card>
      )}

      {history.length > itemsPerPage && (
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
            onClick={handleNext}
            className="me-2"
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

export default OrderHistory;
