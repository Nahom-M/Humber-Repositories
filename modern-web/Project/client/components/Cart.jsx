import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.current_cart || []);
        calculateTotal(data.current_cart || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [navigate]);

  const calculateTotal = (moviesList) => {
    const totalPriceInCents = moviesList.reduce(
      (sum, movie) => sum + Math.round(Number(movie.price) * 100),
      0
    );
    setTotal(totalPriceInCents / 100);
  };

  const handleRemove = async (movieId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/remove_cart/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();
      setMovies(data.current_cart);
      calculateTotal(data.current_cart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/checkout`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete checkout");
      }

      const data = await response.json();
      console.log("Checkout successful:", data);
      navigate("/profile");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Container className="cart">
      <h2>Total Items ({movies.length})</h2>
      <div className="cart-items">
        {movies.map((movie) => (
          <div key={movie.id} className="cart-item">
            <div>
              <strong>{movie.title}</strong>
            </div>
            <div>Type: {movie.type}</div>
            <div>Rental Time: {movie.rentalTime} days</div>
            <div>Price: ${Number(movie.price).toFixed(2)}</div>
            <Button variant="danger" onClick={() => handleRemove(movie.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total:</h3>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button className="btn btn-success checkoutBtn" onClick={handleCheckout}>
        Checkout
      </Button>
    </Container>
  );
};

export default Cart;
