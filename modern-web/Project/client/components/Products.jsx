import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  // Fetch all shows
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/shows/list`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Handles the search bar
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Compares item names to user input
  const handleSearchClick = () => {
    const newFilteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  // Redirect to Detail.jsx
  const handleRentNowClick = (id) => {
    navigate(`/prod/${id}`);
  };

  return (
    <Container className="mt-5 productsContainer productsBackground">
      <h1 className="text-center prodTitle">Movies & TV Shows Rental</h1>
      <div
        className="searchDiv"
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          placeholder="Search"
          className="productSearch"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px 0 0 4px",
            outline: "none",
          }}
        />
        <Button
          onClick={handleSearchClick}
          style={{
            padding: "8px 16px",
            background: "#007bff",
            color: "#fff",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
          }}
          className="search-btn"
        >
          Search
        </Button>
      </div>
      <Row className="mt-4 rowControl">
        {filteredItems.map((item) => {
          const price = item.price ? item.price.toFixed(2) : "0.00";
          const imageUrl = item.image
            ? `data:image/jpeg;base64,${item.image}` // Convert Base64 to image URL
            : item.image_link || ""; // Fallback to `image_link` if provided

          return (
            <Col md={4} className="mb-4" key={item._id}>
              <Card
                style={{
                  backgroundImage: imageUrl
                    ? `linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(${imageUrl})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                }}
              >
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Type: {item.type}</Card.Text>
                  <Card.Text>Price: ${price}</Card.Text>
                  <Button
                    variant="dark"
                    onClick={() => handleRentNowClick(item._id)} // Pass the item id
                  >
                    Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Products;
