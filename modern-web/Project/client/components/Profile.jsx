import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Alert, Spinner, Button } from "react-bootstrap";
import OrderHistory from "./OrderHistory";
import Rentals from "./Rentals"; // Rentals now fetches its own data

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login", { replace: true });
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
          throw new Error("Failed to fetch user information");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching user information");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading your profile...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No user information available.</Alert>
      </Container>
    );
  }

  return (
    <Container className="profileContainer">
      <h1>User Profile</h1>

      <div className="profileContent">
        {/* Personal Information on the left */}
        <div className="personalInfo">
          <h2>Personal Information</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          {/* Current Shopping List */}
          <div className="shoppingList">
            <Link to="/Cart" className="btn btn-info btn-lg cartLink">
              To Cart
            </Link>
          </div>
        </div>

        {/* Right-side content: Order History and Shopping List */}
        <div className="rightSection">
          <div className="personalInfo2">
            <h2 style={{ marginBottom: "33px" }}>Options</h2>
            <div className="profile-btn-container">
              <Button onClick={() => navigate(`/update-profile/${user._id}`)}>
                Update Account
              </Button>
              <Button onClick={() => navigate(`/rentals`)}>View Rentals</Button>
              <Button onClick={() => navigate(`/history`)}>Show History</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rentals component no longer needs props 
      <Rentals />

      Order History 
      <OrderHistory />*/}
    </Container>
  );
};

export default Profile;
