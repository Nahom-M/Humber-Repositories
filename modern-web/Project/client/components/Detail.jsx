import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import YouTubeEmbed from "./YouTubeEmbeded";

const Detail = () => {
  const { id } = useParams(); // Get the show ID from the URL
  const [show, setShow] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track screen size
  const navigate = useNavigate(); // For navigating back
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/shows/fetch/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
      })
      .catch((error) => {
        console.error("Error fetching show details:", error);
      });

    const handleResize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize); // Listen for size changes

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up
    };
  }, [id]);

  const handleRentNow = async () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    const rentalItem = {
      id: show._id, // Use the show's _id directly
      title: show.title,
      price: show.price,
      rentalTime: show.rental_time,
      type: show.type, // Include the type field
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/update_cart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_cart: [rentalItem], // Send the rental item to the backend
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to update cart");
        return;
      }

      setErrorMessage(""); // Clear any error messages
      navigate("/cart"); // Redirect to cart page after update
    } catch (error) {
      console.error("Error updating cart:", error);
      setErrorMessage("There was an error updating your cart.");
    }
  };

  if (!show) {
    return <div className="loading">Loading...</div>; // Handle loading state
  }

  return (
    <div className="details-layout">
      <div
        className="details-container"
        style={{
          backgroundImage: `linear-gradient(to left, transparent, black), url(${
            show.image_link || "/images/default.jpg"
          })`,
        }}
      >
        <h1 className="show-title">{show.title}</h1>
        <div className="details-layout">
          <div className="details-content">
            <p className="show-type">
              <strong>Type:</strong> {show.type}
            </p>
            <p className="show-genres">
              <strong>Genres:</strong> {show.genres && show.genres.join(", ")}
            </p>
            <p className="show-director">
              <strong>Director:</strong> {show.director}
            </p>
            <p className="show-dateReleased">
              <strong>Release Date:</strong> {show.dateReleased.split("T")[0]}
            </p>
            <p className="show-price">
              <strong>Price:</strong> ${show.price}
            </p>
            <p className="show-rentalTime">
              <strong>Rental Time:</strong> {show.rental_time}
            </p>
            <div className="button-container">
              <Button
                variant="secondary"
                className="back-button"
                onClick={() => navigate("/products")}
              >
                To Products
              </Button>
              <Button
                variant="success"
                className="rent-now-button"
                onClick={handleRentNow}
              >
                Rent Now
              </Button>
            </div>
            {errorMessage && (
              <p
                className="error-message"
                style={{ color: "red", margin: "auto", padding: 0 }}
              >
                {errorMessage}
              </p>
            )}
          </div>
          {!isSmallScreen && (
            <div className="youtube-container">
              <YouTubeEmbed source={show.trailer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
